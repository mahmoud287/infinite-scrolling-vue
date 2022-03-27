<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">Comments</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Comments</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <a-list
          class="comment-list"
          :header="`${todos_list.length} replies`"
          item-layout="horizontal"
          :data-source="todos_list"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <comment :comment="item" />
          </a-list-item>
        </a-list>

        <infinite-loading
          v-if="todos_list.length"
          spinner="bubbles"
          @infinite="infiniteScroll"
        ></infinite-loading>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2022 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Comment from "@/components/Comment.vue";
import InfiniteLoading from "vue-infinite-loading";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "IndexPage",
  components: {
    Comment,
    InfiniteLoading,
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState(["todos_list"]),
  },
  methods: {
    ...mapActions(["fetch_todos_list"]),
    ...mapMutations(["RESET_TODOS"]),
    async get_todos_list(page = 1) {
      await this.fetch_todos_list(page);
    },
    async infiniteScroll($state) {
      await this.fetch_todos_list(this.page++);
      $state.loaded();
    },
  },
  async mounted() {
    this.RESET_TODOS([]);
    await this.get_todos_list();
  },
};
</script>
