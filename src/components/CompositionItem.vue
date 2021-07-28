<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
              <div v-show="!showForm">
                <h4 class="inline-block text-2xl font-bold">{{movie.modified_name}}</h4>
                <button @click.prevent="deleteMovie" class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
                  <i class="fa fa-times"></i>
                </button>
                <button @click.prevent="showForm = !showForm" class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
              <div v-show="showForm">

                <div 
                class="text-white text-center font-bold p-4 mb-4"
                 v-if="show_alert"
                 :class="alert_variant">
                {{ alert_message }}
                </div>

                <vee-form 
                :validation-schema="schema"
                 :inital-values="movies"
                  @submit="edit">

                  <div class="mb-3">
                    <label class="inline-block mb-2">Song Title</label>
                    <vee-field type="text" name="modified_name"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Song Title"
                      @input="updateUnsavedFlag(true)" />
                      <ErrorMessage class="text-red-600" name="modified_name"/>
                  </div>
                  <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <vee-field type="text" name="genre"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Genre" 
                      @input="updateUnsavedFlag(true)"/>
                      <ErrorMessage class="text-red-600" name="genre"/>
                  </div>
                  <button type="submit" :disabled="in_submission" class="py-1.5 px-3 rounded text-white bg-green-600">
                    Submit
                  </button>
                  <button type="button" :disabled="in_submission" @click.prevent="showForm = false" class="py-1.5 px-3 rounded text-white bg-gray-600">
                    Go Back
                  </button>
                </vee-form>
              </div>
            </div>  
</template>

<script>
import { moviesCollection, storage } from '../includes/firebase';
export default {

    data() {
       return {

           showForm: false,

           schema: {

             modified_name: 'required',
             genre: 'alpha_spaces'
           },

           in_submission: false,
           show_alert: false,
           alert_variant: 'bg-blue-500',
           alert_message: 'Please wait! Updating movie info.'
       }
    },

    name: 'CompositionItem',
    props: {

        movie: {

           type: Object,
           required: true
        },

        updateSong: {

          type: Function,
          required: true
        },

        index: {

          type: Number,
          required: true
        },

        removeMovie: {

          type: Function,
          required: true
        },

        updateUnsavedFlag: {

          type: Function
        }
    },

    methods: {

     async edit(values) {

       this.in_submission = true;
       this.show_alert = true;
       this.alert_variant = 'bg-blue-500';
       this.alert_message = 'Please wait! Updating movie info.';

       try{

      await moviesCollection.doc(this.movie.docID).update(values);

       }catch(error) {

         this.in_submission = false;
         this.alert_variant = 'bg-red-500';
         this.alert_message = 'Something went wrong! Try again later.';
         return;
       }


       this.updateMovie(this.index, values);
       this.updateUnsavedFlag(false);


       this.in_submission = false;
       this.alert_variant = 'bg-green-500';
       this.alert_message = 'You successfully updated the movie!';
      },


      async deleteMovie() {

        const storageRef = storage.ref();
        const movieRef = storageRef.child(`movies/${this.movie.original_name}`);

      await  movieRef.delete();


     await moviesCollection.doc(this.movie.docID).delete();

     this.removeMovie(this.index);
      }
    }
    
}
</script>