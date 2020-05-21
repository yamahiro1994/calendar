<template>
    <div id="app">
        <video id="their-video" width="500" autoplay playsinline></video>
        <video id="my-video" width="500px" autoplay muted playsinline></video>
        <p>Your Peer ID: <span id="my-id">{{peerId}}</span></p>
        <input v-model="calltoid" placeholder="call id">
        <button @click="makeCall" class="button--green">Call</button>
        <br />

        マイク:
        <select v-model="selectedAudio" @change="onChange">
            <option disabled value="">Please select one</option>
            <option v-for="(audio, key, index) in audios" v-bind:key="index" :value="audio.value">
            {{ audio.text }}
            </option>
        </select>

        カメラ:
        <select v-model="selectedVideo" @change="onChange">
            <option disabled value="">Please select one</option>
            <option v-for="(video, key, index) in videos" v-bind:key="index" :value="video.value">
            {{ video.text }}
            </option>
        </select>
    </div>
</template>

<script>
let localStream;

  // カメラ映像取得
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then( stream => {
        // 成功時にvideo要素にカメラ映像をセットし、再生
        const videoElm = document.getElementById('my-video')
        videoElm.srcObject = stream;
        videoElm.play();
        // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
        localStream = stream;
    }).catch( error => {
        // 失敗時にはエラーログを出力
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });

    //Peer作成
    const peer = new Peer({
        key: '4224ee6a-716f-4b8f-b543-49ef6692d1fd',
        debug: 3
    });

    //PeerID取得
    peer.on('open', () => {
        document.getElementById('my-id').textContent = peer.id;
    });


    const API_KEY = "4224ee6a-716f-4b8f-b543-49ef6692d1fd";
    // const Peer = require('../skyway-js');
    console.log(Peer)
    export default {
        data: function () {
            return {
                audios: [],
                videos: [],
                selectedAudio: '',
                selectedVideo: '',
                peerId: '',
                calltoid: '',
                localStream: {}
            }
        },
        methods: {
            onChange: function(){
                if(this.selectedAudio != '' && this.selectedVideo != ''){
                    this.connectLocalCamera();
                }
            },

            connectLocalCamera: async function(){
                const constraints = {
                    audio: this.selectedAudio ? { deviceId: { exact: this.selectedAudio } } : false,
                    video: this.selectedVideo ? { deviceId: { exact: this.selectedVideo } } : false
                }

                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                document.getElementById('my-video').srcObject = stream;
                this.localStream = stream;
            },

            makeCall: function(){
                const call = this.peer.call(this.calltoid, this.localStream);
                this.connect(call);
            },

            connect: function(call){
                call.on('stream', stream => {
                    const el = document.getElementById('their-video');
                    el.srcObject = stream;
                    el.play();
                });
            }
        },

        created: async function(){
            console.log(API_KEY)
            this.peer = new Peer({key: API_KEY, debug: 3}); //新規にPeerオブジェクトの作成
            this.peer.on('open', () => this.peerId = this.peer.id); //PeerIDを反映
            this.peer.on('call', call => {
                call.answer(this.localStream);
                this.connect(call);
            });

            //デバイスへのアクセス
            const deviceInfos = await navigator.mediaDevices.enumerateDevices();

            //オーディオデバイスの情報を取得
            deviceInfos
            .filter(deviceInfo => deviceInfo.kind === 'audioinput')
            .map(audio => this.audios.push({text: audio.label || `Microphone ${this.audios.length + 1}`, value: audio.deviceId}));

            //カメラの情報を取得
            deviceInfos
            .filter(deviceInfo => deviceInfo.kind === 'videoinput')
            .map(video => this.videos.push({text: video.label || `Camera  ${this.videos.length - 1}`, value: video.deviceId}));

            console.log(this.audios, this.videos);
        }
    }
</script>

<style scoped>

    #app{
        margin-top: 50px;
        text-align: center;
    }
    p {
        margin: 20px 0;
        font-size: 2em;
        text-align: center;
        border: 1px solid;
    }

    video{
        border: 1px solid;
        margin: 0 auto;
        height: 400px;
        width: 45%;
    }

    video#my-video{
        margin-left: 20px;
    }

    input{
        margin-bottom: 30px;
        border: 1px solid;
    }
</style>