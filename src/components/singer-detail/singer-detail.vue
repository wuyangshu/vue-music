<template>
 <transition name="slide">
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong, isValidMusic, processSongsUrl} from 'common/js/song'
import MusicList from 'components/music-list/music-list'


export default {
  computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters(
        [
            'singer'
        ]
      )
  },
  data() {
      return {
          songs: []
      }
  },
      created() {
          this._getDetail()
        //   console.log(this.singer)
      },
      methods: {         
          _getDetail() {
              if(!this.singer.id) {
                  this.$router.push('/singer')
                  return
              }
              getSingerDetail(this.singer.id).then((res)=>{
                  if(res.code === ERR_OK) {
                      processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
                        this.songs = songs
                    //   this.songs = this._normalizeSongs(res.data.list)
                    //   console.log(this.songs)
                    })
                  }
              })
          },
          _normalizeSongs(list) {
              let ret = []
              list.forEach((item) => {
                  let {musicData} = item
                  if (isValidMusic(musicData)) {
                        ret.push(createSong(musicData))
                    }
              })
              return ret
          }
      },
      components: {
        MusicList
    }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"


.slide-enter-active, .slide-leave-active
    transition: all 0.3s
.slider-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

</style>

