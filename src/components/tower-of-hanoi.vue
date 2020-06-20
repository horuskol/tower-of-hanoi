<template>
    <div class="flex justify-between items-center mx-8" style="height: 400px">
        <div class="flex flex-col justify-end items-center full" style="width: 25%; height: 200px">
            <div style="position: relative; height: 100%">
                <div class="bg-yellow-700" style="position: absolute; top: 0; bottom: 0; left: calc(50% - 5px); right: calc(50% - 5px);"></div>
            </div>
            <div class="flex-none bg-red-600" style="height: 50px; width: 64px">

            </div>
            <div class="flex-none bg-green-600" style="height: 50px; width: 96px">

            </div>
            <div class="flex-none bg-blue-600" style="height: 50px; width: 128px">

            </div>
            <div class="flex-none h-2 w-full bg-yellow-700"></div>
        </div>

        <div class="flex flex-col justify-end items-center full" style="width: 25%; height: 200px">
            <div style="position: relative; height: 100%">
                <div class="bg-yellow-700" style="position: absolute; top: 0; bottom: 0; left: calc(50% - 5px); right: calc(50% - 5px);"></div>
            </div>
            <div class="flex-none h-2 w-full bg-yellow-700"></div>
        </div>

        <div class="flex flex-col justify-end items-center full" style="width: 25%; height: 200px">
            <div style="position: relative; height: 100%">
                <div class="bg-yellow-700" style="position: absolute; top: 0; bottom: 0; left: calc(50% - 5px); right: calc(50% - 5px);"></div>
            </div>
            <div class="flex-none h-2 w-full bg-yellow-700"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pegs: [
                [ 1, 2, 3 ],
                [],
                []
            ]
        }
    }
};
</script>