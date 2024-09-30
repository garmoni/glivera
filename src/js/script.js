const customersData = [
    {
        name: "Jane Cooper",
        company: "Microsoft",
        phone: "(225) 555-0118",
        email: "jane@microsoft.com",
        country: "United States",
        status: "Active"
    },
    {
        name: "Floyd Miles",
        company: "Yahoo",
        phone: "(205) 555-0100",
        email: "floyd@yahoo.com",
        country: "Kiribati",
        status: "Inactive"
    },
    {
        name: "Ronald Richards",
        company: "Adobe",
        phone: "(302) 555-0107",
        email: "ronald@adobe.com",
        country: "Israel",
        status: "Inactive"
    },
    {
        name: "Marvin McKinney",
        company: "Tesla",
        phone: "(252) 555-0126",
        email: "marvin@tesla.com",
        country: "Iran",
        status: "Active"
    },
    {
        name: "Jerome Bell",
        company: "Google",
        phone: "(629) 555-0129",
        email: "jerome@google.com",
        country: "Réunion",
        status: "Active"
    },
    {
        name: "Kathryn Murphy",
        company: "Microsoft",
        phone: "(406) 555-0120",
        email: "kathryn@microsoft.com",
        country: "Curaçao",
        status: "Active"
    },
    {
        name: "Jacob Jones",
        company: "Yahoo",
        phone: "(208) 555-0112",
        email: "jacob@yahoo.com",
        country: "Brazil",
        status: "Active"
    },
    {
        name: "Kristin Watson",
        company: "Facebook",
        phone: "(704) 555-0127",
        email: "kkristin@facebook.com",
        country: "Åland Islands",
        status: "Inactive"
    },
];

function populateTable() {
    const tableBody = document.getElementById("customers-table-body");
    customersData.forEach(customer => {
        const row = document.createElement("div");
        row.className = "customers-table__row";
        row.innerHTML = `
            <div class="customers-table__cell">${customer.name}</div>
            <div class="customers-table__cell">${customer.company}</div>
            <div class="customers-table__cell">${customer.phone}</div>
            <div class="customers-table__cell">${customer.email}</div>
            <div class="customers-table__cell">${customer.country}</div>
            <div class="customers-table__cell customers-table__cell--status"><span>${customer.status}</span></div>
        `;

        const statusCell = row.querySelector('.customers-table__cell:last-child');
        
        if (customer.status === 'Active') {
            statusCell.classList.add('active');
        }

        tableBody.appendChild(row);
    });
}

populateTable();

let navMobile = document.querySelector('.customers__navigation')
document.querySelector('.customers__menu-btn').addEventListener('click', function() {
    this.classList.toggle('active');
    navMobile.classList.toggle('active');
});