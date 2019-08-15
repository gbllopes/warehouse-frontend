test('First test', () => {
    expect(true).toBeTruthy();
})

test('Secondc test', () => {
    expect(true).toBeTruthy();
})

test('Second Test', () => {
    expect(total(1,2)).toBe(`R$ ${1+2}`);
})

describe("test", () => {
    const sum = (a,b) => a + b;
    expect(sum(1,2)).toBe(3);
})

const sum = (a,b) => a + b;

const total = (shipping,subtotal) => 'R$ ' + sum(shipping, subtotal);
