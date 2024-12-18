document.addEventListener("DOMContentLoaded", () => {
    const quantityButtons = document.querySelectorAll(".quantity-btn");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");
    const couponInput = document.getElementById("couponCode");
    const applyCouponButton = document.getElementById("applyCoupon");
    const couponMessage = document.getElementById("couponMessage");

    let subtotal = 7.49; 
    const taxRate = 0.15; 
    const validCoupons = {
        SAVE10: 0.1, 
        SAVE20: 0.2, 
    };
    let appliedDiscount = 0;

    function calculateTotal() {
        const discount = subtotal * appliedDiscount;
        const tax = (subtotal - discount) * taxRate;
        const total = subtotal - discount + tax;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    quantityButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const action = e.target.dataset.action;
            const quantityElement = e.target.closest(".quantity-control").querySelector(".quantity");
            let quantity = parseInt(quantityElement.textContent);

            if (action === "increase") {
                quantity++;
            } else if (action === "decrease" && quantity > 1) {
                quantity--;
            }

            quantityElement.textContent = quantity;

            const priceElement = e.target.closest(".product-item").querySelector(".product-price");
            const price = parseFloat(priceElement.textContent.replace("$", ""));
            subtotal += action === "increase" ? price : -price;

            calculateTotal();
        });
    });

    applyCouponButton.addEventListener("click", () => {
        const couponCode = couponInput.value.trim().toUpperCase();

        if (validCoupons[couponCode]) {
            appliedDiscount = validCoupons[couponCode];
            couponMessage.textContent = `Coupon applied! You get ${appliedDiscount * 100}% off.`;
            couponMessage.className = "coupon-message";
            calculateTotal();
        } else {
            couponMessage.textContent = "Invalid coupon code. Please try again.";
            couponMessage.className = "coupon-message invalid";
            appliedDiscount = 0;
            calculateTotal();
        }
    });
});
