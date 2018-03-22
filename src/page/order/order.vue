<template>
  <div class="order-page">
    <head-top head-title="订单列表" go-back="true"></head-top>
    <ul class="order-list-ul">
      <li class="order-list-li">
        <img src="" alt="">
        <section class="order-item-right">
          <section @click="showDetail(item)">
            <header class="order-item-right-header">
              <section class="order-header">
                <h4>
                  <span class="ellipsis"></span>
                  <svg fill="#333" class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </h4>
                <p class="order-time">2018-02-10</p>
              </section>
              <p class="order-status">已签收</p>
            </header>
            <section class="order-basket">
              <p class="order-name ellipsis"></p>
              <p class="order-amount">23.9</p>
            </section>
          </section>
          <div class="order-again">
            <compute-time></compute-time>
            <router-link></router-link>
            <div class="search">
              <input type="text">
              <a href="" class="submit">搜索</a>
            </div>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>
