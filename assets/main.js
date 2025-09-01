function loadUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
            document.getElementById("table").style.opacity = "1";
            const tbody = document.getElementById("tbody");
            tbody.innerHTML = "";

            data.forEach(user => {
                tbody.innerHTML += `<tr id="user-${user.id}">
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.address.city} , ${user.address.street}</td>

            <td>
            <button onclick ="deleteUser(${user.id})">حذف</button>
            <button onclick = "editUser(${user.id} , '${user.name}' , '${user.email}')">ویرایش</button>
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
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
            //headers:  یک اطلاعات به سرور می دهیم که ما داده هایمان را در چه قالبی می خواهیم ارسال بکنیم و این اطلاعات رو از بک اند دولوپر می گیریم
        })
        .then(res => res.json())
        .then(user => {
            alert("کاربر با موفقیت ارسال شد، ولی ذخیره نمی شود چون API تستی است");
            console.log("POST response:", user);


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
        .then(() => {
            alert(`کاربر با شناسه ${id} حذف شد (فقط در ظاهر، چون API تستی است)`);
            loadUsers(); //بازخوانی لیست
        });
}

// ویرایش کاربر
function editUser(id, oldName, oldEmail) {
    const newName = prompt("نام جدید را وارد کنید:", oldName);
    const newEmail = prompt("ایمیل جدید را وارد کنید:", oldEmail);

    if (!newName || !newEmail) {
        alert("ورودی نامعتبر بود");
        return;
    }

    fetch('https://jsonplaceholder.typicode.com/users/${id}', {
            method: 'PATCH',
            body: JSON.stringify({
                name: newName,
                email: newEmail
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        .then(res => res.json())
        .then(updated => {
            console.log(updated);
            alert("ویرایش انجام شد(نمایشی)")


            // اعمال تغییرات به صورت نمایشی
            const row = document.getElementById('user-${id}');
            row.children[1].textContent = updated.name;
            row.children[3].textContent = updated.email;
            // وقتی المانی در جاوااسکریپت فراخوانی می شود اصطلاحا اچ تی ام کولکشن نامیده می شود که می توان رفتاری شبیه به آرایه با آن انجام داد و هر کدام از فرزندان آن را می توان یکی از اندیس های آن دانست ولی به آن آرایه نمی گوییم.

            // روش دوم:
            // row.querySelector("td:nth-child(2)").textContent = updated.name;
            // row.querySelector("th:nth-child(4)").textContent = updated.email;
        });
}

