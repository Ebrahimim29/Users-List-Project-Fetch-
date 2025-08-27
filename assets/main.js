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

            <td>
            <button onclick ="deleteUser(${user.id})">حذف</button>
            <button>ویرایش</button>
            </td>            
            </tr>`;
            console.log(user);            
        });
    });
}

// اضافه کردن کاربر (HTTP Method POST)

function addUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({name: name , email: email , phone: phone}),
  headers: {'Content-type': 'application/json; charset=UTF-8'}
  //headers:  یک اطلاعات به سرور می دهیم که ما داده هایمان را در چه قالبی می خواهیم ارسال بکنیم و این اطلاعات رو از بک اند دولوپر می گیریم
})
.then(res => res.json())
.then(user =>{
    alert("کاربر با موفقیت ارسال شد، ولی ذخیره نمی شود چون API تستی است");
    console.log("POST response:" , user); 

    
     //این قسمت صرفا برای نمایش اطلاعات اضافه شده است، چون دیتاهای جیسون پلیس هولدر تغییر ناپذیر است و می خواهیم تغییرات را با این وجود باز هم ببینیم
    tbody.innerHTML += `<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.phone}</td>
    <td>${user.email}</td>
    <td> </td>
    
    <td>
    <button onclick = "deleteUser(${user.id})">حذف</button>
    <button>ویرایش</button>
    </td>

    </tr>`;
});
}

// حذف کاربر
function deleteUser(id) {
    fetch('https://jsonplaceholder.typicode.com/users/${id}', {
      method: 'DELETE',
    })
    //تفاوت با دو متد بالا این است که خروجی را در پارامتر ریسپانس ذخیره نمی کنیم. چون صرفا قراره یک آی دی رو حذف کنیم
    .then(()=>{
        alert(`کاربر با شناسه ${id} حذف شد (فقط در ظاهر، چون API تستی است)`);
        loadUsers(); //بازخوانی لیست
    });
}
