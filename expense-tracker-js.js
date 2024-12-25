// ... (previous variables remain the same) ...

// Delete expense
function deleteExpense(expenseId, element) {
    // Add fade out animation
    element.classList.add('fade-out');
    
    // Wait for animation to complete before removing
    setTimeout(() => {
        // Remove from expenses array
        expenses = expenses.filter(expense => expense.id !== expenseId);
        updateUI();
    }, 300);
}

// Update expense history
function updateHistory() {
    const historyContainer = document.getElementById('expenseHistory');
    historyContainer.innerHTML = '';

    expenses.slice().reverse().forEach(expense => {
        const item = document.createElement('div');
        item.className = 'expense-item';
        if (selectedExpenses.has(expense.id)) {
            item.classList.add('selected');
        }

        item.innerHTML = `
            <div class="expense-content">
                <div class="expense-details">
                    <span class="expense-name">${expense.name}</span>
                    <span class="expense-date">${formatDate(expense.date)}</span>
                </div>
                <span class="expense-amount">₹${expense.amount.toFixed(2)}</span>
            </div>
            <i class="delete-icon" data-lucide="trash-2"></i>
        `;

        // Initialize the trash icon
        lucide.createIcons({
            icons: {
                'trash-2': item.querySelector('[data-lucide="trash-2"]')
            }
        });

        // Add delete handler
        const deleteIcon = item.querySelector('.delete-icon');
        deleteIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering selection
            deleteExpense(expense.id, item);
        });

        // Add long press handler
        item.addEventListener('touchstart', () => {
            longPressTimer = setTimeout(() => {
                enterSelectionMode();
                toggleExpenseSelection(expense.id, item);
            }, 500);
        });

        item.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });

        // Add click handler for selection mode
        item.addEventListener('click', () => {
            if (isSelectionMode) {
                toggleExpenseSelection(expense.id, item);
            }
        });

        historyContainer.appendChild(item);
    });
}

// ... (rest of the previous JavaScript remains the same) ...
