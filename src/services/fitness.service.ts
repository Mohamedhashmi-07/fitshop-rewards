import { loadDb, saveDb } from '../config/database';

export function utcIso(): string {
  return new Date().toISOString();
}

export class MockFitnessProvider {
  /**
   * Mock Fitness Provider simulating verified activity data
   * (Google Health Connect, Apple Health, Fitbit, Garmin)
   */
  public static verifyActivity(activityType: string, requiredVal: number, unit = 'km') {
    let verifiedVal = requiredVal;
    if (unit === 'km') {
      verifiedVal = Math.round((requiredVal + 0.2) * 10) / 10;
    } else if (unit === 'steps') {
      verifiedVal = Math.floor(requiredVal + 420);
    } else if (unit === 'mins') {
      verifiedVal = Math.floor(requiredVal + 5);
    }

    return {
      verified: true,
      activity: activityType.toLowerCase(),
      requiredValue: requiredVal,
      verifiedValue: verifiedVal,
      unit,
      timestamp: utcIso(),
      provider: 'MockFitnessProvider (Ready for Google Health Connect / Apple Health)',
    };
  }
}

export class ChallengeService {
  public static startChallenge(user: any, offerId: string, productId: string) {
    const db = loadDb();
    const offer = (db.fitnessOffers || []).find(o => o.id === offerId);
    if (!offer) {
      return { challenge: null, error: 'Offer not found' };
    }

    if (!user.challenges) {
      user.challenges = {};
    }

    const key = `${productId}_${offerId}`;
    user.challenges[key] = {
      offerId,
      productId,
      couponCode: offer.couponCode || 'FIT15',
      discountPercent: offer.discountPercent || 15,
      status: 'CHALLENGE_STARTED',
      dailyTarget: offer.dailyTarget || 5,
      unit: offer.unit || 'km',
      totalDays: offer.totalDays || 3,
      daysCompleted: 0,
      dailyVerifications: [],
      startedAt: utcIso(),
    };

    return { challenge: user.challenges[key], error: null };
  }

  public static verifyStep(user: any, offerId: string, productId: string) {
    const key = `${productId}_${offerId}`;
    const challenges = user.challenges || {};
    const challenge = challenges[key];

    if (!challenge) {
      return { challenge: null, verification: null, error: 'Challenge has not been started yet' };
    }

    const verification = MockFitnessProvider.verifyActivity(
      challenge.unit || 'km',
      challenge.dailyTarget || 5,
      challenge.unit || 'km'
    );

    challenge.daysCompleted = (challenge.daysCompleted || 0) + 1;
    if (!challenge.dailyVerifications) challenge.dailyVerifications = [];
    challenge.dailyVerifications.push(verification);

    user.currentStreak = (user.currentStreak || 4) + 1;
    user.fitnessPoints = (user.fitnessPoints || 820) + 100;

    if (challenge.daysCompleted >= challenge.totalDays) {
      challenge.status = 'UNLOCKED';
      if (!user.unlockedCoupons) user.unlockedCoupons = [];
      const couponObj = {
        couponCode: challenge.couponCode,
        discountPercent: challenge.discountPercent,
        productId,
        offerId,
        unlockedAt: utcIso(),
      };
      if (!user.unlockedCoupons.some((c: any) => c.couponCode === challenge.couponCode && c.productId === productId)) {
        user.unlockedCoupons.push(couponObj);
      }
    } else {
      challenge.status = 'IN_PROGRESS';
    }

    return { challenge, verification, error: null };
  }
}

export class CouponService {
  public static applyCoupon(user: any, productId: string, couponCode: string) {
    const unlocked = user.unlockedCoupons || [];
    const valid = unlocked.find((c: any) => c.productId === productId && c.couponCode === couponCode);

    if (!valid) {
      return { success: false, error: 'Coupon is locked or not earned yet', applied: null };
    }

    if (!user.appliedCoupons) user.appliedCoupons = {};
    user.appliedCoupons[productId] = {
      couponCode,
      discountPercent: valid.discountPercent,
      appliedAt: utcIso(),
    };

    return { success: true, error: null, applied: user.appliedCoupons[productId] };
  }
}
