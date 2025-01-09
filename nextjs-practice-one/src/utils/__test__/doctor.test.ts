import { getExperienceRange } from '..';

describe('getExperienceRange', () => {
  it('Should return the correct experience range for a valid value', () => {
    expect(getExperienceRange('fresher')).toEqual({ expStart: 1, expEnd: 2 });
    expect(getExperienceRange('junior')).toEqual({ expStart: 2, expEnd: 5 });
    expect(getExperienceRange('senior')).toEqual({ expStart: 5, expEnd: 10 });
  });

  it('Should return { expStart: 0, expEnd: 0 } for an invalid value', () => {
    expect(getExperienceRange('invalid')).toEqual({ expStart: 0, expEnd: 0 });
  });
});
