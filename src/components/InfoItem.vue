<template>
  <div class="info-item">
    <div class="info-icon">
      <i :class="icon"></i>
    </div>
    <div>
      <div class="header-wrapper">
        {{header}}
      </div>
      <div class="content-wrapper">
        <div>{{content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoItem',
  props: {
    icon: {
      type: String
    },
    header: {
      type: String
    },
    content: {
      type: String
    }
  }
}
</script>

<style scoped>
.info-item {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #c2c2c2;
  padding: 0.4rem;
  background-color: #f1f1f1;
  cursor: pointer;
  transition: 0.4s box-shadow;
}
.info-item:hover {
  box-shadow: 0 20px 10px -20px rgba(0, 0, 0, 0.4);
  transition: 0.4s box-shadow;
}
.info-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 4px;
  background: linear-gradient(45deg, #ffffff, #d9d9d9);
  box-shadow:  -4px 4px 8px #cdcdcd,
              4px -4px 8px #ffffff;
  font-size: 1.4rem;
  margin-right: 1rem;
}
.header-wrapper {
  text-transform: uppercase;
  font-size: 0.6rem;
  font-weight: bold;
}
.content-wrapper {
  font-weight: bold;
  text-transform: capitalize;
}
</style>
