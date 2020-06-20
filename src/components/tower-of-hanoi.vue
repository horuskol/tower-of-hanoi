<template>
    <div class="flex justify-between items-center mx-8" style="height: 400px">
        <div v-for="(peg, p) in pegs" :key="p" class="flex flex-col-reverse justify-start items-center" style="width: 25%; height: 200px">
            <block class="flex-none h-2 w-full bg-yellow-700 z-10" :peg="p" :dragged="dragged" @dropped="dropped"></block>

            <block
                v-for="(block, b) in peg" :key="b"
                class="flex-none z-20" :class="[ blocks[block].color ]"
                style="height: 50px" :style="{ width: blocks[block].width }"
                :peg="p" :block="block"
                @start-dragging="startDragging" :draggable="true"
                :dragged="dragged"
                @dropped="dropped"
            >
            </block>

            <div class="z-0" style="position: relative; height: 100%">
                <div class="bg-yellow-700" style="position: absolute; top: 0; bottom: 0; left: calc(50% - 5px); right: calc(50% - 5px);"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Block from './block';

export default {
    components: {
        'block': Block,
    },

    data() {
        return {
            dragged: {},

            pegs: [
                [ 1, 2, 3 ],
                [],
                []
            ],

            blocks: {
                1: { color: 'bg-blue-600', width: '128px'},
                2: { color: 'bg-green-600', width: '96px'},
                3: { color: 'bg-red-600', width: '64px'},
            }
        }
    },

    methods: {
        startDragging(event) {
            console.log(event);
            this.dragged = {
                target: event.target
            }
        },

        endDragging() {
            this.dragged = {};
        },

        dropped({source, target}) {
            this.pegs[source.peg] = this.pegs[source.peg].filter((block) => {
                return block !== source.block;
            });
            this.pegs[target.peg].push(source.block);

            this.dragged = {};
        }
    },

    mounted() {
        document.addEventListener("dragend", () => {
            this.endDragging()
        }, false);

        document.addEventListener("dragover", (event) => {
            event.preventDefault();
        }, false);
    }
};
</script>