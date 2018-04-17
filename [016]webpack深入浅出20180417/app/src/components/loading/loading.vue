<template>
  <div class="loading-wrap">
    <div style="width:100%;height:100%" class="lds-dual-ring">
      <div></div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>
<style scoped>
  @keyframes lds-dual-ring {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes lds-dual-ring {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .loading-wrap{
    position: fixed;
    width:50px;
    height:50px;
    top:50%;
    left:50%;
    margin-left:-25px;
    margin-top:-25px;
  }
  .lds-dual-ring {
    position: relative;
  }
  .lds-dual-ring div {
    position: absolute;
    width: 160px;
    height: 160px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    border: 8px solid #000;
    border-color: #7f4395 transparent #7f4395 transparent;
    -webkit-animation: lds-dual-ring 1s linear infinite;
    animation: lds-dual-ring 1s linear infinite;
  }
  .lds-dual-ring {
    width: 50px !important;
    height: 50px !important;
    -webkit-transform: translate(-25px, -25px) scale(0.25) translate(25px, 25px);
    transform: translate(-25px, -25px) scale(0.25) translate(25px, 25px);
  }
</style>