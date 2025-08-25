function loadUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data =>{
        document.getElementById("table").style.opacity = "1";
        const tbody = document.getElementById("tbody");
        tbody.innerHTML = "";

        data.forEach(user =>{
            tbody.innerHTML += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.address.city} , ${user.address.street}</td>

            <td><button>حذف</button></td>
            </tr>`;
            console.log(user);            
        });
    });
}

// اضافه کردن کاربر (HTTP Method POST)

function addUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({name: name , email: email}),
  headers: {'Content-type': 'application/json; charset=UTF-8'}
  //headers:  یک اطلاعات به سرور می دهیم که ما داده هایمان را در چه قالبی می خواهیم ارسال بکنیم و این اطلاعات رو از بک اند دولوپر می گیریم
})
.then(res => res.json())
.then(user =>{
    alert("کاربر با موفقیت ارسال شد، ولی ذخیره نمی شود چون API تستی است");
    console.log("POST response:" , user); 

    
     //این قسمت صرفا برای نمایش اطلاعات اضافه شده است، چون دیتاهای جیسون پلیس هولدر تغییر ناپذیر است و می خواهیم تغییرات را با این وجود باز هم ببینیم
    tbody.innerHTML += `<tr>
    <td> </td>
    <td>${user.name}</td>
    <td> </td>
    <td>${user.email}</td>
    <td> </td>
    <td><button>حذف</button></td>
    </tr>`;
});
}

