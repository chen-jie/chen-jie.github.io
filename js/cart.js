Vue.prototype.$http = axios
var vm = new Vue({
    el:"#app",
    data:{
        productList:[],
        totalMoney:0,
        checkAllFlag:false
    },
    mounted:function () {
        this.init()
    },
    computed:{
        totalMoneyByComputed:function(){
            let totalMoney = 0;
            this.productList.forEach(item=>{
                if(item.checked){
                    totalMoney += item.price * item.count;
                }
            })
            return totalMoney;
      }
    },
    watch:{
        productList:{
            handler:function () {
                this.totalMoney = 0;
                this.productList.forEach(item=>{
                    if(item.checked){
                        this.totalMoney += item.price * item.count;
                    }
                })
            },
            deep:true
        }
    },
    filters:{
        formatMoney(value,type){
            if(!type){
                type = '';
            }
            return "￥"+value+type;
        }
    },
    methods:{
        init:function(){
            axios.get("data/cart.json",{"id":123}).then(res=>{
                this.productList = res.data.result.list;
                this.totalMoney = res.data.result.totalMoney;
            })

        },
        changeCount:function(item,count){
            item.count += count;
            if(item.count <= 0){
                item.count = 1;
            }
        },
        selectProduct:function (item) {
            if(typeof item.checked == 'undefined'){
                this.$set(item,"checked",true);
            }else{
                item.checked = !item.checked;
            }
        },
        checkAll:function () {
            this.checkAllFlag = !this.checkAllFlag;
            this.productList.forEach(item=>{
                if(typeof item.checked == 'undefined'){
                    this.$set(item,"checked",this.checkAllFlag);
                }else{
                    item.checked = this.checkAllFlag;
                }
            })
        },
        deleteItem:function (index) {
            let res = confirm("确定要删除吗？");
            if(res){
                this.productList.splice(index,1);
            }
        }
    }
});