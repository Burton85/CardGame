<template>
  <div class="container">
    <div class="u-center-text u-margin-bottom-big">
      <h2 class="heading heading-secondary">choose the same card in time!</h2>
      <div class="container-card u-margin-big">
        <div class="row u-margin-small">
          <div
            v-for="(card,index) in cardlist"
            class="col-3"
            :key="card.id"
            :id="card.id"
            @click="Choose(card.id)"
          >
            <div class="card" tabindex="0">
              <div class="card_side card_side--front">*</div>
              <div class="card_side card_side--back">
                <img :src="card.img" :alt="index" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <Alert v-if="(this.selectlist.length >= this.cardlist.length-1)" msg="Congratulations!" />
    </transition>
  </div>
</template>

<script>
import Alert from "./Alert";

export default {
  name: "card",
  components: {
    Alert
  },
  data() {
    return {
      cardlist: [
        { id: 0, img: "https://unsplash.it/220/400?random" },
        { id: 1, img: "https://unsplash.it/220/400?random" },
        { id: 2, img: "https://unsplash.it/220/400?random" },
        { id: 3, img: "https://unsplash.it/220/400?random" },
        { id: 4, img: "https://unsplash.it/220/400?random" },
        { id: 5, img: "https://unsplash.it/220/400?random" },
        { id: 6, img: "https://unsplash.it/220/400?random" },
        { id: 7, img: "https://unsplash.it/220/400?random" },
        { id: 8, img: "https://unsplash.it/220/400?random" }
      ],
      result: [],
      selecting: "",
      another: "",
      // time: 0,
      selectlist: []
    };
  },
  created: function() {
    function randomCard(n, num) {
      //生成卡片
      let list = new Array(n); //原陣列
      for (let i = 0; i < list.length; i++) {
        list[i] = i;
      } //生成n組數的陣列
      const t = Math.floor(list.length / num); //推測會產生幾組
      var result = []; //新陣列，最後身成的二維陣列
      for (let j = 0; j < t; j++) {
        let newList = []; //陣列中的陣列
        for (let x = 0; x < num; x++) {
          let id = Math.floor(Math.random() * list.length); // 從原陣列中隨機提取一個數字放入新陣列
          newList.push(list[id]);
          list.splice(id, 1);
        }
        result.push(newList);
      }
      return result;
    }
    this.result = randomCard(9, 2);
    this.result.forEach((element, index) => {
      //根據輸出的陣列分配卡片內容
      element.forEach(e => {
        this.cardlist[e].img = "https://unsplash.it/220/400?random" + index + 1;
      });
    });
  },
  methods: {
    Choose(id) {
      if (id !== this.selecting && !this.selectlist.includes(id)) {
        //不能選已完成的卡片及正在配對的卡片
        this.Page(id); //翻開卡片
        if (this.selecting === "") {
          //如果沒有正在配對的卡片
          this.selecting = id; //設限在卡片為配對中卡片
          this.result.forEach(p => {
            //尋找正解卡片
            if (p.includes(id)) {
              if (p[0] == id) {
                this.another = p[1];
              } else {
                this.another = p[0];
              }
            }
          });
        } else {
          //如果有正在配對的卡片
          if (this.another === id) {
            //找到正解
            this.selectlist.push(this.selecting, this.another);
            this.Complete(this.selecting, this.another);
            this.selecting = "";
            this.another = "";
          } else {
            this.Repage(id);
            this.Repage(this.selecting);
            this.selecting = "";
            this.another = "";
          }
        }
      }
    },
    Complete(sel, ano) {
      document.getElementById(sel).setAttribute("class", "completed");
      document.getElementById(ano).setAttribute("class", "completed");
    },
    Page(id) {
      document.getElementById(id).setAttribute("class", "page");
    },
    Repage(id) {
      document.getElementById(id).classList.remove("page");
    }
  }
  // watch: {
  //   selectlist: {
  //     handler() {
  //       if (this.selectlist.length >= this.cardlist.length-1) {
  //         setTimeout(() => {
  //           alert("success!");
  //         }, 10);
  //       }
  //     }
  //   }
  // }
};
</script>

