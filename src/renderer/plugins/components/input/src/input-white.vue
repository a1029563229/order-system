<template>
    <div class="input-control">
        <i v-if="icon" class="iconfont" :class="icon"></i>
        <input
                ref="input"
                class="input-white"
                :class="className"
                :type="type"
                :placeholder="placeholder"
                :value="value"
                @input="updateValue($event.target.value)">
        <div class="login-btn" v-if="name === 'input-msg'">
            <button type="button" @click="getCode" class="vp-btn vp-btn-purple" v-if="time === 0">
                获取验证码
            </button>
            <button type="button" class="vp-btn vp-btn-purple vp-btn-ccc" v-if="time > 0">
                {{time}}S
            </button>
        </div>
    </div>
</template>

<script>
    import { Checks } from '../../../../pages/Verification';
    export default {
        name:'input-white',

        data() {
          return {
              time:0
          }
        },

        props:{
            name: {
                type:String,
                default: 'input-default'
            },
            type: {
                type:String,
                default: 'text'
            },
            placeholder:{
                type:String,
                default:''
            },
            className:{
                type:String,
                default:''
            },
            value:{
                required:true,
                default:''
            },
            regExp:{
                required:false
            },
            msg:{

            },
            icon:{
                type:String
            }
        },

        methods: {
            updateValue (value) {
                let formattedValue = value;

                if (formattedValue !== value) {
                    this.$refs.input.value = formattedValue;
                }

                this.$emit('input', formattedValue);
            },

            getCode() {
                if (!Checks.CheckPhone(this.msg)) {
                    this.$toast('请输入正确的手机号码');
                } else {
                    this.time = 60;
                    let time = setInterval(() => {
                        this.time--;
                        if (this.time == 0) {
                            clearInterval(time);
                        }
                    },1000);
                    this.axios.get('set_code',{ params: { mobile: this.msg } }).then(data => {

                    })
                }
            }
        },

        mounted() {
//            console.log(this.icon);
        }
    }
</script>

<style lang="less" scoped rel="stylesheet/less" type="text/css">
    @import '../../../assets/css/flex.less';
    .input-control{
        .flex-left;
        .box-sizing;
        height: 50px;
        margin-bottom:20px;
        i {
            background-color:#fff;
            width: 15%;
            font-size:25px;
            color: #9596AB;
            height:100%;
            padding:10px;
            .box-sizing;
        }
        .input-white{
            .box-sizing;
            padding-left: 10px;
            height:100%;
            width: 85%;
            background-color: #fff;
            border-radius: 3px;
            font-size:20px;
            /*border-bottom:10px solid transparent;*/
        }
        .input-little{
            width: 35%;
        }
        .login-btn{
            width:50%;
            overflow: hidden;
            .vp-btn{
                font-size:16px;
                float: right;
                margin:0;
                height:52px;
                width: 85%;
            }
        }
        .vp-btn-ccc {
            color: #fff;
            background: #747077;
            border:1px solid #747077;
        }

    }
</style>