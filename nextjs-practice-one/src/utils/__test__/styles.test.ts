import { cn } from '..';

describe('cn', () => {
  it('Should combine multiple class names into a single string', () => {
    const result = cn('class1', 'class2', 'class3');

    expect(result).toBe('class1 class2 class3');
  });

  it('Should handle conditional class names', () => {
    const result = cn('class1', false && 'class2', 'class3');

    expect(result).toBe('class1 class3');
  });

  it('Should remove duplicate class names', () => {
    const result = cn('class1', 'class2', 'class1');

    expect(result).toBe('class1 class2 class1');
  });

  it('Should merge conflicting Tailwind classes', () => {
    const result = cn('text-left', 'text-center');

    expect(result).toBe('text-center');
  });

  it('Should handle empty inputs gracefully', () => {
    const result = cn();

    expect(result).toBe('');
  });

  it('Should handle undefined or null values gracefully', () => {
    const result = cn('class1', undefined, null, 'class2');

    expect(result).toBe('class1 class2');
  });

  it('Should handle complex inputs', () => {
    const result = cn('class1', ['class2', 'class3'], {
      class4: true,
      class5: false,
    });

    expect(result).toBe('class1 class2 class3 class4');
  });
});
