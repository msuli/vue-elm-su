<template>
  <div>
    <app-header signin-up="home">
      <span slot="logo" class="head-logo">ele.me</span>
    </app-header>

    <nav class="city-nav">
      <div class="city-tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在列表选择：</span>
      </div>
      <router-link to="/login"
                   class="guess-city"
                   v-if="guessCity">
        <span>{{ guessCity}}</span>
      </router-link>
    </nav>
    <section id="hot-city-contener">
      <h4>热门城市：</h4>
      <ul class="uk-list">
        <router-link
          tag="li" to="/login"
          v-if="hotCity"
          v-for="hCity in hotCity" :key="hCity.id">
          <a>{{ hCity.name}}</a>
        </router-link>
      </ul>
    </section>
    <section class="group-city-container">
      <ul class="letter-classify">
        <li class="letter-classify-li">
          <h4>A</h4>
          <ul>
            <router-link
              tag="li" to="/login">
              <a>上海</a>
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  import Header from '../../components/header/Header.vue';
  import {cityGuess, hotCities, cityGroup} from '../../service/getData';

  export default {
    data(){
      return {
        guessCity: '',
        guessCityId: '',
        hotCity: [],
        cityGroup: []
      }
    },
    components: {
      appHeader: Header
    },
    mounted(){
      cityGuess().then(response => {
          this.guessCity = response.name;
          this.guessCityId = response.id;
      });

      hotCities().then(res => {
          this.hotCity = res;
      });

      cityGroup().then(res => {
        console.log(res);
        let group = {};
        group = res;
        for(let i = 65; i<=90; i++) {
            this.cityGroup[String.fromCharCode(i)] = group[String.fromCharCode(i)];
        }
         console.log(this.cityGroup);
      })

    }
  }
</script>
