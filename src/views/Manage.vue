<template>
    <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">

      <app-upload ref="upload" :addMovie="addMovie"></app-upload>

      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item 
            v-for="(movie, index) in movies"
             :key="movie.docID"
              :movie="movie"
              :updateMovie="updateMovie"
              :index="index"
              :removeMovie="removeMovie"
              :updateUnsavedFlag="updateUnsavedFlag"/>
              </div>
            </div>
          </div>
        </div>
  </section>
</template>

<script>
import AppUpload from '../components/Upload.vue';
import { moviesCollection, auth } from '../includes/firebase';
import CompositionItem from '../components/CompositionItem.vue';
export default {

  data() {
    return {

      movies: [],
      unsavedFlag: false
    }
  },

  components: {

    AppUpload,
    CompositionItem
  },

 async created() {

  const snapshot = await moviesCollection.where('uid', '==', auth.currentUser.uid).get();
  
  snapshot.forEach((document) => {

    const movie = {

      ...document.data(),
      docID: document.id
    }

    this.movies.push(movie);
  })
  },


  methods: {

    updateMovie(index, values) {

       this.movies[index].modified_name = values.modified_name;

       this.movies[index].genre = values.genre;
    },

    removeMovie(index) {

      this.movies.splice(index, 1);
    },

    addMovie(document) {

      const movie = {

        ...document.data(),
        docID: document.id
      }

      this.movies.push(movie);
    },


    updateUnsavedFlag(value) {

      this.unsavedFlag = value;
    }
  },


  beforeRouteLeave(to, from, next) {

    if(!this.unsavedFlag) {

      next();
    }else {

      const leave = confirm('You have unsaved changes.Are you sure you want to leave?');
      next(leave);
    }
  }


  // beforeRouteLeave(to, from, next) {

  //      this.$refs.upload.cancelUploads();
  //      next();
  // }
  
}
</script>