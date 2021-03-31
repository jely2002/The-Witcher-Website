window.onload = function() {
    //Filters
    const menuItems = document.getElementsByClassName("card");
    const filterButtons = document.getElementsByClassName("filter");
    const appliedFilters = [];
    for(const filter of filterButtons) {
        filter.onclick = function() {
            if(appliedFilters.includes(filter.id)) {
                appliedFilters.splice(appliedFilters.indexOf(filter.id), 1);
                filter.classList.remove("selected");
            } else {
                filter.classList.add("selected");
                appliedFilters.push(filter.id);
            }
            if(appliedFilters.length !== 0) {
                for(const menuItem of menuItems) {
                    if(!appliedFilters.includes(menuItem.dataset.type)) {
                        menuItem.classList.add("hide");
                    } else {
                        menuItem.classList.remove("hide");
                    }
                }
            } else {
                for(const menuItem of menuItems) {
                    menuItem.classList.remove("hide");
                }
            }
        };
    }

    //Modal
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("modal-overlay");
    const close = document.getElementById("close");
    const buyButtons = document.getElementsByClassName("buy-button");
    const item = document.getElementById("item");
    const total = document.getElementById("total");
    const form = document.getElementById("customer-info");

    document.addEventListener('animationstart', function(e) {
        if(e.animationName === 'fade-in') {
            e.target.classList.add('did-fade-in');
        }
    });

    document.addEventListener('animationend', function(e) {
        if(e.animationName === 'fade-out') {
            overlay.classList.remove("show-overlay");
            modal.classList.remove("show-modal");
            overlay.classList.remove("fade-out");
            modal.classList.remove("fade-out");
            e.target.classList.remove('did-fade-in');
        }
    });

    form.addEventListener('submit', function(e) {
       e.preventDefault();
       alert('Payment disabled, no backend found.');
    });

    close.onclick = function() { closeModal(); };
    overlay.onclick = function() { closeModal(); };

    for(const btn of buyButtons) {
        btn.onclick = function() {
            const card = this.closest(".card");
            openModal(card.dataset.title, card.dataset.price);
        };
    }

    function openModal(title, price) {
        overlay.classList.add("show-overlay");
        modal.classList.add("show-modal");
        item.innerHTML = title + " (incl. VAT): $" + price;
        total.innerHTML = "Total: $" + (parseFloat(price) + 10);
    }

    function closeModal() {
        overlay.classList.add("fade-out");
        modal.classList.add("fade-out");
    }

};
