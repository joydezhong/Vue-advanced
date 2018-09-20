<template>
    <div>
        <h1>介绍页</h1>
        <button @click="handleClick">跳转到user</button>
    </div>
</template>

<script>
    export default {
        methods: {
            handleClick: function(){
                this.$router.push('/user/654321');
            }
        }

    }
</script>

<style scoped>

</style>