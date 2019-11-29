// importamos la funcion que vamos a testear


describe('signInFacebook', () => {
    it('debería ser una función', () => {
        expect(typeof window.signInFacebook).toBe('function');
    });
});