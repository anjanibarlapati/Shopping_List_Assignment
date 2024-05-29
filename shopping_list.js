class ItemClass
{
    constructor(description,deleteStatus,doneStatus)
    {
        this.description=description;
        this.deleteStatus=deleteStatus;
        this.doneStatus=doneStatus;
    }
    getDescription()
    {
        return this.description;
    }
    getDeleteStatus()
    {
        return this.deleteStatus;
    }
    getDoneStatus()
    {
        return this.doneStatus;
    }
   
    setDeleteStatus(deleteStatus)
    {
        this.deleteStatus=deleteStatus;
    }
    setDoneStatus(doneStatus)
    {
        this.doneStatus=doneStatus;
    }

}  


var markedCount=0,totalItemsCount=0;
var unmarkedCount=0;

//Event Listeners

var marked=document.getElementById('marked_items_count');
var unmarked=document.getElementById('unmarked_items_count');
var totalItems=document.getElementById('total_items_count');
marked.innerHTML=0;
unmarked.innerHTML=0;
totalItems.innerHTML=0;

var inputBox=document.getElementById('input_id');
var itemListDiv=document.getElementById('item_list_div');
inputBox.addEventListener('keypress',function(e){   
    if(e.key==='Enter')
       addItem();
});

var itemsList=[];

function addItem()
{
    var inputValue=inputBox.value;
    if(inputValue!='')
    {
    var itemObj=new ItemClass(inputValue,false,false);
    itemsList.push(itemObj);
    inputBox.value='';
    totalItemsCount++;
    renderItemList(itemsList, checkbox.checked);
    }
}
    
function createItemDiv(item)
{
        var itemDiv=document.createElement('div');
        var itemText=document.createElement('span');
        var deleteButton=document.createElement('span');
        itemText.textContent=item.getDescription();
        deleteButton.textContent='X';
        itemDiv.appendChild(itemText);
        itemDiv.appendChild(deleteButton);
        itemListDiv.appendChild(itemDiv);
        
        if(item.getDoneStatus()===false)
             {   itemDiv.classList.add('item_div');}
        else
             {   itemDiv.classList.add('item_div_marked');}
        //itemText.classList.add('item_text');
        deleteButton.classList.add('delete_button');
        deleteButton.addEventListener('click',() => deleteFunction(item));

        itemDiv.addEventListener('click',() => {
                clickingItem(item,itemDiv);
        } );
}

function renderItemList(itemsList, checked)
{
    itemListDiv.innerText ='';
    itemsList.forEach((item)=>
    {  
       // console.log(itemsList);
       if(checked && item.getDeleteStatus()===false && item.getDoneStatus()===false)
        {            
            createItemDiv(item);
      }
      else if(!checked && item.getDeleteStatus()===false)
      {
        createItemDiv(item);
        
      }
    });
 
    var markedCountClass=document.getElementsByClassName('item_div_marked');
    var unmarkedCountClass=document.getElementsByClassName('item_div');
    unmarkedCount=unmarkedCountClass.length;

     if(checked)
    {
        marked.innerHTML=totalItemsCount-unmarkedCount;
        unmarked.innerHTML=unmarkedCount;
        totalItems.innerHTML=totalItemsCount;
    }
    else
    {
        markedCount=markedCountClass.length;
        marked.innerHTML=markedCount;
        unmarked.innerHTML=unmarkedCount;
        totalItemsCount=markedCount+unmarkedCount;
        totalItems.innerHTML=totalItemsCount;
    }
    
   
   
}

function deleteFunction(item)
{
    item.setDeleteStatus(true);
    totalItemsCount--;
    renderItemList(itemsList,checkbox.checked);
}

function clickingItem(item,element)
{    
    
    if(item.getDoneStatus()===false)
     {   
           item.setDoneStatus(true);
           element.classList.remove('item_div');
           element.classList.add('item_div_marked');
     }
    else
      {
         item.setDoneStatus(false);
         element.classList.remove('item_div_marked'); 
         element.classList.add('item_div');
      }
     renderItemList(itemsList, checkbox.checked); 
}


var checkbox=document.getElementById('checkbox');
checkbox.addEventListener('click',()=>hideMarkedItems());

function hideMarkedItems()
{
  renderItemList(itemsList, checkbox.checked);
}




