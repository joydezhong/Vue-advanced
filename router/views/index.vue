<template>
    <div>
        <h1>首页</h1>
        <router-link to="/about">跳转到about</router-link>
        <hr>
        <h2>Vuex</h2>
        <h4>修改状态上的数据</h4>
        {{count}}
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button>
        <hr>
        <h4>状态过滤器</h4>
        {{list}}
        <hr>
        <h4>状态anctions的异步操作 看上面数据的变化</h4>
        <button @click="handleAsyncIncrement">异步+5</button>
        <hr>
        <h2>vue-bus</h2>
        <div>
            随机增加：
            <Counter :number="number"></Counter>
        </div>

    </div>
</template>

<script>
    import Counter from './counter.vue';

    export default {
        components: {
            Counter
        },
        data(){
           return {
               number: 0
           }
        },
        created(){
           this.$bus.on('add', this.handleAddRandom);
        },
        computed: {
            count(){
                return this.$store.state.count;
            },
            list (){
                return this.$store.getters.filteredList;
            }
        },
        beforeDestroy(){
            this.$bus.off('add', this.handleAddRandom);
        },
        methods: {
            handleIncrement(){
                this.$store.commit('increment');
            },
            handleDecrease(){
                this.$store.commit('decrease');
            },
            handleAsyncIncrement(){
                this.$store.dispatch('asyncIncrement').then(()=>{
                    console.log(this.$store.state.count);
                })
            },
            handleAddRandom(num){
                this.number += num;
            }
        }
    }
</script>

<style scoped>

</style>