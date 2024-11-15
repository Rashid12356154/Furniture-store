 const cartBtn=document.getElementById('cart-btn');
const closeCart=document.getElementById('close-cart');
cartBtn.addEventListener('click',()=>{
    document.getElementById('cart').classList.toggle('hidden')
})
closeCart.addEventListener('click',()=>{
    document.getElementById('cart').classList.toggle('hidden')
   
})


const userBtn=document.getElementById('user-btn');
const closeUser=document.getElementById('close-login')
userBtn.addEventListener('click',()=>{
    document.getElementById('login').classList.toggle("hidden");
})
closeUser.addEventListener('click',()=>{
    document.getElementById('login').classList.toggle("hidden");
})


const navBtn=document.getElementById('nav-btn');
const closeNav=document.getElementById('close-nav');

navBtn.addEventListener('click',()=>{
    document.getElementById('navbar').classList.toggle('hidden')
})
closeNav.addEventListener('click',()=>{
    document.getElementById('navbar').classList.toggle('hidden')
})




let newdata;
let baskit=JSON.parse(localStorage.getItem("data"))||[];
let total;

fetch("./data.json").then((res)=> res.json()).then((data)=>{
    newdata=data;
    DisplayProduct();
    DisplaySells()
    DisplayCart()
})



function DisplayProduct (){
    const product=document.getElementById('product');
    let items=newdata.filter(p=> p.categorie ==='product');
    items.map((item)=>{
        const card=document.createElement('div');
        card.className='shadow-md rounded-md grid gap-4'
        card.innerHTML=`<div class="w-full h-[250px] overflow-hidden">
                        <img src="${item.img}" alt="" class="w-full h-full object-cover">
                    </div>
                    <div  class="grid gap-4 p-3">
                        <div class="flex justify-between items-center">
                            <h1 class="text-secondary font-semibold  capitalize">${item.title}</h1>
                            <div class="flex gap-2 items-center">
                                <img src="./image/baseline-star_half-24px.png" alt="">
                                <img src="./image/baseline-star_half-24px.png" alt="">
                                <img src="./image/baseline-star_half-24px.png" alt="">
                                
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <h1 class="text-secondary font-medium text-xl">$${item.price}</h1>
                            <button class="flex gap-2 items-center bg-accent py-2 px-4 rounded-md shadow-md  cursor-pointer hover:shadow-xl transition-shadow ease-in-out" onclick="AddToCart(${item.id})">
                                <img src="./image/baseline-shopping_cart-24px.png" alt="" class="w-5">
                                <span class="text-primary text-sm font-medium">Add To Cart</span>
                            </button>
                        </div>
                    </div>`
                    product.appendChild(card)
        
    })
    
}


function DisplaySells(){
    const sell=document.getElementById('sell');
    const items=newdata.filter(p => p.categorie ==='top sells');
    items.map((item) =>{
        const card=document.createElement('div');
        card.className='shadow-md rounded-md overflow-hidden grid gap-4'
        card.innerHTML=`<div class="w-full overflow-hidden">
                    <img src="${item.img}" alt="" class="w-full  object-cover" style="height:300px">
                </div>
                <div  class="grid gap-4 p-3">
                    <h1 class="text-secondary text-xl font-semibold capitalize">${item.title}</h1>
                    <p  class="text-secondary text-sm font-medium opacity-80">${item.dis}</p>
                    <div class="flex justify-between items-center">
                        <h1 class="text-secondary font-medium text-xl">$${item.price}</h1>
                        <button class="flex  bg-accent w-8 h-8  rounded-full  justify-center items-center shadow-md  cursor-pointer hover:shadow-xl transition-shadow ease-in-out" onclick="AddToCart(${item.id})">
                            <span class="text-primary text-lg font-medium"> + </span>
                        </button>
                    </div>
                </div>`
                sell.appendChild(card)
    })
   
}

function AddToCart(id){
    let product=newdata.find(p => p.id ===id);
    let cart=baskit.find(p => p.id ===id);
    if(cart)return
    else{
        baskit.push({...product,qty:1});
    }
    document.getElementById('empty').style.display='none'
     
    baskit=baskit.filter(p => p.id !==0);
    localStorage.setItem('data',JSON.stringify(baskit))
    DisplayCart()
           
            
}

function DisplayCart(){
    total=baskit.reduce(  (acc,p) => acc+p.price * p.qty,0);
    let count=baskit.reduce( (acc,p)=> acc+p.qty,0);
     const showCart=document.getElementById("show-cart");
     showCart.innerHTML=''
     baskit.map((item)=>{
        const card=document.createElement('div');
         card.className='bg-primary shadow-sm flex p-2 gap-4'
         card.innerHTML=` <img src="${item.img}" alt="" class="w-20 h-20">
                   <div class="w-full grid gap-4">
                    <div class="flex w-full justify-between items-center">
                        <h1 class="text-secondary font-medium">${item.title}</h1>
                        <button onclick="Delete(${item.id})">
                            <img src="./image/baseline-close-24px.png" alt="" class="w-6">
                        </button>
                    </div>
                    <div class="flex justify-between items-center">
                        <h1 class="text-accent font-medium text-lg">${item.price}</h1>
                        <div class="flex gap-2 items-center">
                            <button class=" flex items-center justify-center p-2 bg-primary shadow-lg rounded-md" onclick="Minus(${item.id})">
                                <img src="./image/baseline-arrow_left-24px.png" alt="" >
                            </button>
                            <span id="qty" class="text-secondary font-medium">${item.qty}</span>
                            <button class=" flex items-center justify-center p-2 bg-primary shadow-lg rounded-md" onclick="Pluse(${item.id})">
                                <img src="./image/baseline-arrow_right-24px.png" alt="">
                            </button>
                        </div>
                    </div>
                   </div>`
                   showCart.appendChild(card);
     })
     if(count ===0){
        document.getElementById('empty').style.display='flex'
        document.getElementById("count").innerHTML=count
        
    }else{
        document.getElementById('count').innerHTML=count;
    }
    document.getElementById('total').innerHTML=`$${total}`
}


function Delete(id){
  baskit=baskit.filter(p => p.id !==id);
  localStorage.setItem("data",JSON.stringify(baskit))
  DisplayCart()
    
}

function Minus(id){
    let cart=baskit.find(p=>p.id===id);
    if(cart){
        if(cart.qty===0)return
        else{
            cart.qty-=1;
        }
    }
    DisplayCart()
    baskit=baskit.filter(p => p.qty !==0);
    localStorage.setItem('data',JSON.stringify(baskit))
    Update(id)
}

function Update(id){
    const  item=baskit.find(p => p.id ===id);
    if(item==undefined){
        DisplayCart()
    }else{
        document.getElementById('qty').innerHTML=item.qty;
    }
}

function Pluse(id){
    const cart=baskit.find(p => p.id===id);
    if(cart){
        cart.qty +=1
    }
    DisplayCart()
    localStorage.setItem('data', JSON.stringify(baskit))
     Update(id);
}


function Checkout(){
    alert('thank your for shopping!');
    baskit=[]
    localStorage.setItem("data",JSON.stringify(baskit));
    DisplayCart()
}