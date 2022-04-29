const get_attraction = (posA, posB, chargeA, chargeB) => {
  let dp = new Vector(posA.x - posB.x, posA.y - posB.y);
  dp.mult((0.02 * (chargeA * chargeB)) / pow(dp.mag(), 2.5));

  return dp;
};

export { get_attraction };
