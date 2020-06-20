<template>
    <div ref="block" :draggable="draggable" @dragstart="startDragging">
        <div v-if="showDropzone" class="relative border border-gray-900" :style="styleObject" @dragenter="draggedOver = true" @dragleave="draggedOver = false" @drop="dropped"></div>
    </div>
</template>

<script>
export default {
    props: {
        block: Number,
        draggable: {
            type: Boolean,
            default: false
        },
        dragged: Object,
        peg: Number
    },

    data() {
        return {
            draggedOver: false,
        }
    },

    computed: {
        styleObject() {
            return {
                top: '-50px',
                height: '50px',
                left: 'calc(50% - ' + (this.dragged?.target?.clientWidth / 2) + 'px)',
                width: this.dragged?.target?.clientWidth,
                borderStyle: this.draggedOver ? 'solid' : 'dashed'
            }
        },

        showDropzone() {
            return this.dragged?.target?.clientWidth && this.$refs['block'].clientWidth > this.dragged?.target?.clientWidth;
        }
    },

    methods: {
        startDragging(event) {
            console.log(event);
            event.dataTransfer.setData('text/json', JSON.stringify({
                block: this.block,
                peg: this.peg
            }));
            event.dataTransfer.dropEffect = 'move';

            this.$emit('start-dragging', event);
        },

        dropped(event) {
            event.preventDefault();

            this.$emit('dropped', {
                source: JSON.parse(event.dataTransfer.getData('text/json')),
                target: {
                    peg: this.peg
                }
            });

            // this.dragged.target.parentNode.removeChild(this.dragged.target);
            // event.target.parentNode.parentNode.insertBefore(this.dragged.target, event.target.parentNode);
        }
    }
};
</script>
