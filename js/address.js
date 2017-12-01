var vm = new Vue({
    el:".container",
    data:{
        addressList:[],
        filterCount : 3,
        currentIndex : 0,
        shippingMethod : 1,
    },
    mounted:function () {
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    computed:{
        filterAddressList:function () {
            return this.addressList.slice(0,this.filterCount);
        }
    },
    methods:{
        getAddressList:function(){
            axios.get("data/address.json",{"id":123}).then(res=>{
                this.addressList = res.data.result;
            })
        },
        setDefault:function (addressId){
            this.addressList.forEach(item=>{
                if(item.addressId == addressId){
                    item.isDefault = true;
                }else{
                    item.isDefault = false;
                }
            })
        },
    }
});