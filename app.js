let cart = [];
let discounts = [];

function addItem() {
    const itemName = document.getElementById('item-name').value;
    const itemCategory = document.getElementById('item-category').value;
    const itemPrice = parseFloat(document.getElementById('item-price').value);

    if (!itemName || !itemCategory || isNaN(itemPrice) || itemPrice <= 0) {
        alert('Please enter valid item details');
        return;
    }

    cart.push({ name: itemName, category: itemCategory, price: itemPrice });
    updateCartTable();
}

function updateCartTable() {
    const cartTableBody = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
    cartTableBody.innerHTML = '';

    cart.forEach(item => {
        const row = cartTableBody.insertRow();
        const cellName = row.insertCell(0);
        const cellCategory = row.insertCell(1);
        const cellPrice = row.insertCell(2);

        cellName.innerText = item.name;
        cellCategory.innerText = item.category;
        cellPrice.innerText = item.price.toFixed(2);
    });
}

function addDiscount() {
    const discountType = document.getElementById('discount-type').value;
    let discount;

    switch (discountType) {
        case 'Fixed amount':
            const amount = parseFloat(prompt('Enter discount amount:'));
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            discount = { type: 'Fixed amount', amount: amount };
            break;
        case 'Percentage discount':
            const percentage = parseFloat(prompt('Enter discount percentage:'));
            if (isNaN(percentage) || percentage <= 0) {
                alert('Please enter a valid percentage');
                return;
            }
            discount = { type: 'Percentage discount', percentage: percentage };
            break;
        case 'Percentage discount by item category':
            const category = prompt('Enter item category:');
            const categoryPercentage = parseFloat(prompt('Enter discount percentage:'));
            if (!category || isNaN(categoryPercentage) || categoryPercentage <= 0) {
                alert('Please enter valid category and percentage');
                return;
            }
            discount = { type: 'Percentage discount by item category', category: category, amount: categoryPercentage };
            break;
        case 'Discount by points':
            const points = parseFloat(prompt('Enter points:'));
            if (isNaN(points) || points <= 0) {
                alert('Please enter valid points');
                return;
            }
            discount = { type: 'Discount by points', points: points };
            break;
        case 'Special campaigns':
            const everyX = parseFloat(prompt('Enter X THB:'));
            const discountY = parseFloat(prompt('Enter discount Y THB:'));
            if (isNaN(everyX) || everyX <= 0 || isNaN(discountY) || discountY <= 0) {
                alert('Please enter valid values for X and Y');
                return;
            }
            discount = { type: 'Special campaigns', everyX: everyX, discountY: discountY };
            break;
        default:
            alert('Invalid discount type');
            return;
    }

    discounts.push(discount);
    updateDiscountTable();
}

function updateDiscountTable() {
    const discountTableBody = document.getElementById('discount-table').getElementsByTagName('tbody')[0];
    discountTableBody.innerHTML = '';

    discounts.forEach(discount => {
        const row = discountTableBody.insertRow();
        const cellType = row.insertCell(0);
        const cellParameters = row.insertCell(1);

        cellType.innerText = discount.type;
        cellParameters.innerText = JSON.stringify(discount);
    });
}

function calculateFinalPrice() {
    const discountModule = new DiscountModule(cart, discounts);
    const finalPrice = discountModule.calculateFinalPrice();
    document.getElementById('final-price').innerText = `Final Price: ${finalPrice.toFixed(2)} THB`;
}
