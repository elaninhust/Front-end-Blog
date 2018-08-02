<template>
  <div class="frame-container">
    <div class="frame-left"></div>
    <ul class="frame-right">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    components: {

    }
  }
</script>

<style scoped>
*{
  box-sizing: border-box;
}
  .frame-container{
    height: 100px;
  }
  .frame-left{
    float: left;
    width: 70px;
    height: 70px;
    background: #E2E2E6;
    margin: 15px;
  }

  .frame-right{
    margin-left: 85px;
    height: 100%;
    padding: 15px 15px 15px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
  }

  .frame-right li{
    height: 20%;
    background: #E2E2E6;
    list-style: none;
  }

  .frame-right li:nth-child(1){
    width: 100%;
  }

  .frame-right li:nth-child(2){
    width: 66%;
  }

  .frame-right li:nth-child(3){
    width: 33%;
  }
 
</style>
