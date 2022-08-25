<template>
  <div class="home__about">
    <div class="home__logo"></div>
    <div class="home__about__wrap">
      <input class="home__radio" type="radio" name="about-radio" id="slide1" checked />
      <input class="home__radio" type="radio" name="about-radio" id="slide2" />

      <div class="home__slider">
        <div class="home__slide home__slide_1">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, sit? Aspernatur dolores mollitia at
          exercitationem rerum, optio perspiciatis provident placeat est ipsa? Quo sed itaque iure, magni ea molestiae
          tempore?
        </div>
        <div class="home__slide home__slide_2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex distinctio ad, expedita ducimus ab, dolore
          provident est dicta corporis consectetur dolorem illum! Pariatur, quaerat maxime perspiciatis mollitia omnis
          eum sint.
        </div>
      </div>

      <div class="home__controls">
        <label for="slide1"><span class="home__label"></span></label>
        <label for="slide2"><span class="home__label"></span></label>
      </div>
    </div>
    <custom-btn :text="$t('home.more')" className="btn btn-primary" :onClick="handleBtnClick"></custom-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomBtn from '../buttons/CustomBtn.vue';

export default defineComponent({
  name: 'HomeAbout',

  components: {
    CustomBtn,
  },

  methods: {
    handleBtnClick() {
      this.$router.push({ name: 'about' });
    },
  },
});
</script>

<style scoped>
.home__about {
  height: 100%;
  /* width: 300px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.home__logo {
  width: 300px;
  height: 300px;
  justify-self: start;
  background: no-repeat center center / contain url('@/assets/icons/home/rs-sloths.svg');
}

.home__radio {
  display: none;
}

.home__about__wrap {
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home__slider {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 120px;
}

.home__slide {
  position: absolute;
  opacity: 0;
  transition: 0.5s;
  color: var(--color-text);
}

.home__controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.home__controls label {
  box-sizing: unset;
  cursor: pointer;
  width: 0.7rem;
  height: 0.7rem;
  padding: 0.7rem;
  cursor: default;
}

.home__label {
  display: block;
  border: 0.15rem solid var(--dark-main);
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: var(--dark-main);
  transition: 0.3s;
}

#slide1:checked ~ .home__controls [for='slide1'] .home__label,
#slide2:checked ~ .home__controls [for='slide2'] .home__label {
  background-color: var(--light-main);
}

#slide1:not(#slide1:checked) ~ .home__controls [for='slide1']:hover,
#slide2:not(#slide2:checked) ~ .home__controls [for='slide2']:hover {
  cursor: pointer;
}

#slide1:not(#slide1:checked) ~ .home__controls [for='slide1']:hover .home__label,
#slide2:not(#slide2:checked) ~ .home__controls [for='slide2']:hover .home__label {
  background-color: var(--light-addict);
  border-color: var(--light-addict);
}

#slide1:not(#slide1:checked) ~ .home__controls [for='slide1']:active .home__label,
#slide2:not(#slide2:checked) ~ .home__controls [for='slide2']:active .home__label {
  background-color: var(--blue-main);
  border-color: var(--blue-main);
}

#slide1:checked ~ .home__slider > .home__slide_1 {
  opacity: 1;
}

#slide2:checked ~ .home__slider > .home__slide_2 {
  opacity: 1;
}
</style>
