<template>
  <footer class="footer">
    <a class="rss" href="https://rs.school/js/" target="_blank"></a>
    <div class="team">
      <a class="team__item link" href="https://github.com/WiiJoy" target="_blank">WiiJoy</a>
      <a class="team__item link" href="https://github.com/Ogimly" target="_blank">Ogimly</a>
      <a class="team__item link" href="https://github.com/ThorsAngerVaNeT" target="_blank">VaNeT</a>
      <p class="team__item">&#169; 2022</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterView',
});
</script>

<style>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
}

.rss {
  height: 20px;
  width: 50px;
  background: center center / contain url('../../assets/icons/rs-school.png') no-repeat;
}

.team {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.team__logo {
  height: 40px;
  width: 71px;
  background: center center / contain url('../../assets/icons/wwt-light.svg') no-repeat;
}

.team__github {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
}

.team__item {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.link {
  transition: .3s;
}

.link:hover {
  color: #303030;
}

</style>
