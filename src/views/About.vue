<template>
  <div class="about">
    <img class="about__logo" src="../../public/img/logo.svg" alt="logo" />
    <about-section
      v-for="(section, i) in sections"
      :key="`${section}`"
      :section="section"
      :softClass="i % 2 ? 'left' : 'right'"
    ></about-section>
    <!-- <section class="about__section">
      <h2 class="about__title">О RS SLOTHS</h2>
      <div class="about__project">
        <p class="about__main">Все ленивцы в одном месте!</p>
        <div class="about__descr">
          Мы собрали для Вас всех ленивцев вместе! Теперь достаточно лишь зайти в каталог, выбрать необходимых и скачать
          их. Есть идеи, но нет таких ленивцев? Предложи! Это может быть уже готовый ленивец, рисунок-набросок или
          просто текстовое описание - и если идея найдет отклик у почитателей ленивцев, она обязательно воплотится в
          жизнь!
        </div>
      </div>
    </section>
    <section class="about__section">
      <h2 class="about__title">Интерактивы</h2>
      <div class="about__interactive">
        <div class="about__main">Ленивцы - это про отдых!</div>
        <div class="about__descr">
          Мы постарались сделать так, чтобы Вы могли отдохнуть во время своего пребывания на нашем ресурсе. Расслабтесь
          и сыграйте в "Найди пару", попробуйте правильно отгадать всех ленивцев в одноименной игре, или создавайте
          мемасики на основе существующих стикеров: потехе время, делу час! И раз уж ты зашел сюда - не забудь узнать,
          какой ленивец сегодня ты!
        </div>
      </div>
    </section> -->
    <section class="about__teammates">
      <img :src="`../../public/img/team/wwt-light-${$i18n.locale}.svg`" alt="wwt" />
      <div class="about__team">{{ $t(`about.teammates.main`) }}</div>
      <about-teammate v-for="teammate in teammates" :key="`${teammate}`" :teammate="teammate"></about-teammate>
      <!-- <div class="about__teammates"> -->
      <!-- <div class="about__person">
          <img src="../../public/img/foto.png" alt="photo" class="about__foto" />
          <div class="about__wrap">
            <div class="about__main">WiiJoy</div>
            <div class="about__descr">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa soluta neque, sequi quasi reprehenderit labore
              sint maxime nihil voluptates itaque in expedita facere ullam quos laudantium. Similique aliquid labore
              consequatur.
            </div>
          </div>
        </div> -->

      <!-- <div class="about__person">
        <img src="../../public/img/foto.png" alt="photo" class="about__foto" />
        <div class="about__teammate">
          <div class="about__main">Ogimly</div>
          <div class="about__descr">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident tempora excepturi cumque quasi
            architecto, minus animi temporibus totam similique doloremque aperiam asperiores doloribus tempore quia
            porro velit deleniti voluptatibus iusto.
          </div>
        </div>
      </div> -->
      <!-- <div class="about__person">
        <img src="../../public/img/foto.png" alt="photo" class="about__foto" />
        <div class="about__teammate">
          <div class="about__main">VaNeT</div>
          <div class="about__descr">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae libero laborum commodi omnis similique fuga
            ab sunt qui amet, voluptate, quas aspernatur nihil nobis rem, autem in vero pariatur non.
          </div>
        </div>
      </div> -->
      <!-- </div> -->
    </section>
  </div>
</template>

<script lang="ts">
import AboutSection from '@/components/about/AboutSection.vue';
import AboutTeammate from '@/components/about/AboutTeammate.vue';

export default {
  name: 'AboutView',

  data() {
    return {
      sections: ['sloths', 'interactives'],
      teammates: ['wiijoy', 'ogimly', 'vanet'],
    };
  },

  components: {
    AboutSection,
    AboutTeammate,
  },
};
</script>

<style scoped>
.about {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.about__logo {
  height: 50rem;
}
</style>
