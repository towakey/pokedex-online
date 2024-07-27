<template>
  <v-form>
    <v-text-field
      :model-value="modelValue"
      label="カラーコード"
      @click="showPicker = true"
      :rules="[validateHexColor]"
      @update:model-value="updateColor"
    >
      <template #append>
        <v-icon
          :color="modelValue"
          @click="showPicker = true"
        >
          mdi-palette
        </v-icon>
      </template>
    </v-text-field>
    
    <v-dialog v-model="showPicker" max-width="300px">
      <v-color-picker
        :model-value="modelValue"
        @update:model-value="updateColorFromPicker"
        show-swatches
      ></v-color-picker>
    </v-dialog>
  </v-form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '#000000'
  }
})

const emit = defineEmits(['update:modelValue'])

const showPicker = ref(false)

const updateColor = (value) => {
  if (validateHexColor(value) === true) {
    emit('update:modelValue', value)
  }
}

const updateColorFromPicker = (color) => {
  emit('update:modelValue', color)
  showPicker.value = false
}

const validateHexColor = (value) => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(value) || '有効な16進数カラーコードを入力してください'
}

// 外部からの値の変更を監視
watch(() => props.modelValue, (newValue) => {
  if (validateHexColor(newValue) === true) {
    emit('update:modelValue', newValue)
  }
})
</script>