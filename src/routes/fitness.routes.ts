import { Router, Request, Response } from 'express';
import { loadDb, saveDb } from '../config/database';
import { AuthService } from '../middleware/auth';
import { ChallengeService, MockFitnessProvider, CouponService } from '../services/fitness.service';

const router = Router();

// Helper to get active user from request or default demo user
function getActiveUser(req: Request) {
  const db = loadDb();
  const { user } = AuthService.authenticate(req);
  return user || (db.users && db.users[0]) || null;
}

// POST /api/challenges/start
router.post('/challenges/start', (req: Request, res: Response) => {
  const { offerId, productId } = req.body || {};
  const db = loadDb();
  const user = getActiveUser(req);

  if (!user) {
    return res.status(401).json({ success: false, error: 'User not authenticated' });
  }

  const { challenge, error } = ChallengeService.startChallenge(user, offerId, productId);
  if (error) {
    return res.status(400).json({ success: false, error });
  }

  saveDb(db);
  return res.json({
    success: true,
    message: 'Challenge Started ✓',
    challenge,
    user,
  });
});

// POST /api/challenges/verify AND /api/fitness/verify
const handleVerification = (req: Request, res: Response) => {
  const { offerId, productId } = req.body || {};
  const db = loadDb();
  const user = getActiveUser(req);

  if (offerId && productId) {
    const { challenge, verification, error } = ChallengeService.verifyStep(user, offerId, productId);
    if (error) {
      return res.status(400).json({ success: false, error });
    }

    saveDb(db);
    return res.json({
      success: true,
      message: 'Activity Verified ✓',
      verification,
      challenge,
      isUnlocked: challenge?.status === 'UNLOCKED',
      couponCode: challenge?.couponCode,
      discountPercent: challenge?.discountPercent,
      user,
    });
  } else {
    // Simulator Modal generic activity verification
    const { activityType = 'RUNNING', value = 5, unit = 'km', provider = 'Google Health Connect' } = req.body || {};
    const val = parseFloat(value) || 5;
    const verification = MockFitnessProvider.verifyActivity(activityType, val, unit);

    if (user) {
      user.currentStreak = (user.currentStreak || 4) + 1;
      user.fitnessPoints = (user.fitnessPoints || 820) + 120;
      user.verifiedProvider = provider;
      saveDb(db);
    }

    return res.json({
      success: true,
      message: 'Activity Verified ✓',
      verification,
      user,
      currentStreak: user?.currentStreak || 5,
      pointsEarned: 120,
      newlyUnlocked: [],
    });
  }
};

router.post('/challenges/verify', handleVerification);
router.post('/fitness/verify', handleVerification);

// POST /api/coupons/apply
router.post('/coupons/apply', (req: Request, res: Response) => {
  const { productId, couponCode } = req.body || {};
  const db = loadDb();
  const user = getActiveUser(req);

  if (!user) {
    return res.status(401).json({ success: false, error: 'User not authenticated' });
  }

  const { success, error, applied } = CouponService.applyCoupon(user, productId, couponCode);
  if (!success) {
    return res.status(400).json({ success: false, error });
  }

  saveDb(db);
  return res.json({
    success: true,
    message: `Coupon ${couponCode} applied successfully!`,
    applied,
    user,
  });
});

export default router;
