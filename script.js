document.getElementById('taxForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const income = parseFloat(document.getElementById('income').value);
    if (isNaN(income) || income < 0) {
        alert('Please enter a valid income.');
        return;
    }

    
    const slabs = [
        { upper: 1800000, rate: 0 },
        { upper: 2800000, rate: 0.06 }, 
        { upper: 3300000, rate: 0.18 }, 
        { upper: 3800000, rate: 0.24 },
        { upper: 4300000, rate: 0.30 },
        { upper: Infinity, rate: 0.36 }
    ];

    let tax = 0;
    let taxableIncome = income;
    let prevUpper = 0;

    for (let slab of slabs) {
        const slabAmount = Math.min(taxableIncome, slab.upper) - prevUpper;
        if (slabAmount > 0) {
            tax += slabAmount * slab.rate;
        }
        prevUpper = slab.upper;
        if (taxableIncome <= slab.upper) break;
    }

    const netIncome = income - tax;
    const taxRate = (tax / income) * 100;

    document.getElementById('totalTax').textContent = tax.toLocaleString();
    document.getElementById('netIncome').textContent = netIncome.toLocaleString();
    document.getElementById('taxRate').textContent = taxRate.toFixed(2);
    document.getElementById('result').style.display = 'block';
});
