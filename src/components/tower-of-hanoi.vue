<template>
    <!--
        we need to track mouse movements in the container when trying to move blocks
        might as well track touch movements here, too
    -->
    <div class="flex justify-between items-center mx-8" style="height: 400px" @mousemove="moveBlock" @touchmove="moveBlock">
        <div class="flex flex-col-reverse justify-start items-center" style="width: 25%; height: 200px">
            <div class="flex-none h-2 w-full bg-yellow-700 z-10"></div>

            <!--
                setting 'touch-action: none' stops the browser scrolling around after we pickup a block
                once we've picked up the block, scrolling will remain blocked until we release it
            -->
            <div class="h-16 w-32 bg-red-600 z-10" style="touch-action: none" @mousedown="pickupBlock" @touchstart="pickupBlock" ></div>

            <div class="z-0" style="position: relative; height: 100%">
                <div class="bg-yellow-700" style="position: absolute; top: 0; bottom: 0; left: calc(50% - 5px); right: calc(50% - 5px);"></div>
            </div>
        </div>

        <div class="flex flex-col-reverse justify-start items-center" style="width: 25%; height: 200px">
            <div class="flex-none h-2 w-full bg-yellow-700 z-10"></div>

            <div class="z-0" style="position: relative; height: 100%">
                <div class="bg-yellow-700" style="position: absolute; top: 0; bottom: 0; left: calc(50% - 5px); right: calc(50% - 5px);"></div>
            </div>
        </div>

        <div class="flex flex-col-reverse justify-start items-center" style="width: 25%; height: 200px">
            <div class="flex-none h-2 w-full bg-yellow-700 z-10"></div>

            <div class="z-0" style="position: relative; height: 100%">
                <div class="bg-yellow-700" style="position: absolute; top: 0; bottom: 0; left: calc(50% - 5px); right: calc(50% - 5px);"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dragging: null,

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
        pickupBlock(event) {
            // 'position: fixed' means we can freely position the block anywhere in the page
            event.target.style.position = 'fixed';

            // remember what we're dragging around - this is needed for when we drop the block
            this.dragging = event.target;

            // initialise the position of the block
            // usually the user will start moving as soon as they pickup a block (even if it's just a jiggle)
            // but sometimes they will delay, and if we don't set the left/top positions of the block, it could start anywhere
            this.moveBlock(event);
        },

        moveBlock(event) {
            if (this.dragging) {
                if (event.pageX) {
                    // mousemove is easy - there's only one pointer, so it's x/y is easily found
                    this.dragging.style.left = event.pageX - this.dragging.clientWidth / 2;
                    this.dragging.style.top = event.pageY - this.dragging.clientHeight / 2;
                } else {
                    // touchmove is harder...
                    // multiple touch is supported, but so far we're only interested in one
                    // although, knowing that we can get information on multiple touch points is cool
                    // pinch zoom or rotation
                    this.dragging.style.left = event.changedTouches[0].pageX - this.dragging.clientWidth / 2;
                    this.dragging.style.top = event.changedTouches[0].pageY - this.dragging.clientHeight / 2;
                }
            }
        },

        dropBlock(event) {
            // reset everything
            if (this.dragging) {
                this.dragging.style.position = '';
                this.dragging.style.x = '';
                this.dragging.style.y = '';

                this.dragging = null;
            }
        }
    },

    mounted() {
        // after clicking/touching a block to move, the user can try to 'drop' it anywhere
        // so we listen for this at the top most level
        document.addEventListener('mouseup', this.dropBlock);
        document.addEventListener('touchend', this.dropBlock);
        document.addEventListener('touchcancel', this.dropBlock);
    }
};
</script>