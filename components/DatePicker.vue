<!-- DatePicker.vue -->
<template>
  <v-text-field
    :model-value="formatDate(modelValue)"
    @click="showPicker = true"
    label="日付を選択"
    readonly
  ></v-text-field>
  
  <v-dialog v-model="showPicker" max-width="290px">
    <v-date-picker
      v-model="dateProxy"
      @update:model-value="updateDate"
    ></v-date-picker>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const showPicker = ref(false)

// 文字列をDateオブジェクトに変換する関数
const parseDate = (dateStr) => {
  if (!dateStr) return null
  const [year, month, day] = dateStr.split('-')
  return new Date(year, month - 1, day)
}

// DateオブジェクトをYYYY-MM-DD形式の文字列に変換する関数
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const dateProxy = computed({
  get: () => parseDate(props.modelValue),
  set: (value) => emit('update:modelValue', formatDate(value))
})

const updateDate = (newDate) => {
  emit('update:modelValue', formatDate(newDate))
  showPicker.value = false
}
</script>