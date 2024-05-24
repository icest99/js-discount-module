class DiscountModule {
    constructor(cart, discounts) {
        this.cart = cart;
        this.discounts = discounts;
    }

    calculateFinalPrice() {
        let totalPrice = this.cart.reduce((sum, item) => sum + item.price, 0);

        const couponDiscounts = this.discounts.filter(d => d.type === 'Fixed amount' || d.type === 'Percentage discount');
        const onTopDiscounts = this.discounts.filter(d => d.type === 'Percentage discount by item category' || d.type === 'Discount by points');
        const seasonalDiscounts = this.discounts.filter(d => d.type === 'Special campaigns');

        couponDiscounts.forEach(discount => {
            if (discount.type === 'Fixed amount') {
                totalPrice -= discount.amount;
            } else if (discount.type === 'Percentage discount') {
                totalPrice *= (1 - discount.percentage / 100);
            }
        });

        onTopDiscounts.forEach(discount => {
            if (discount.type === 'Percentage discount by item category') {
                let categoryTotal = this.cart.filter(item => item.category === discount.category)
                    .reduce((sum, item) => sum + item.price, 0);
                totalPrice -= categoryTotal * (discount.amount / 100);
            } else if (discount.type === 'Discount by points') {
                const maxDiscount = totalPrice * 0.2;
                const pointsDiscount = Math.min(discount.points, maxDiscount);
                totalPrice -= pointsDiscount;
            }
        });

        seasonalDiscounts.forEach(discount => {
            const times = Math.floor(totalPrice / discount.everyX);
            totalPrice -= times * discount.discountY;
        });

        return totalPrice < 0 ? 0 : totalPrice;
    }
}
