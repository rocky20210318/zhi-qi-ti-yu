<template>
    <div
        class="number-input"
        :class="{
            'number-input--inline': inline,
            'number-input--center': center,
            'number-input--controls': controls,
            [`number-input--${size}`]: size,
        }"
        v-on="listeners"
    >
        <button
            v-if="controls"
            class="number-input__button number-input__button--minus"
            type="button"
            :disabled="disabled || readonly || !decreasable"
            @click.stop="decrease"
        />
        <input
            ref="input"
            class="number-input__input"
            type="number"
            :name="name"
            :value="currentValue"
            :min="min"
            :max="max"
            :step="step"
            :readonly="readonly || !inputtable"
            :disabled="disabled || (!decreasable && !increasable)"
            :placeholder="placeholder"
            autocomplete="off"
            @change="change"
            @paste="paste"
        >
        <button
            v-if="controls"
            class="number-input__button number-input__button--plus"
            type="button"
            :disabled="disabled || readonly || !increasable"
            @click.stop="increase"
        />
    </div>
</template>

<script>
const isNaN = Number.isNaN || window.isNaN
const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/
const REGEXP_DECIMALS = /\.\d*(?:0|9){10}\d*$/
const normalizeDecimalNumber = (value, times = 100000000000) => (
    REGEXP_DECIMALS.test(value) ? (Math.round(value * times) / times) : value
)

export default {
    name: 'number-input',

    model: {
        event: 'change'
    },

    props: {
        center: Boolean,
        controls: Boolean,
        disabled: Boolean,

        inputtable: {
            type: Boolean,
            default: true
        },

        inline: Boolean,

        max: {
            type: Number,
            default: Infinity
        },

        min: {
            type: Number,
            default: -Infinity
        },

        name: {
            type: String,
            default: undefined
        },

        placeholder: {
            type: String,
            default: undefined
        },

        readonly: Boolean,
        rounded: Boolean,

        size: {
            type: String,
            default: 'small'
        },

        step: {
            type: Number,
            default: 1
        },

        value: {
            type: Number,
            default: NaN
        }
    },

    data () {
        return {
            currentValue: NaN
        }
    },

    computed: {
    /**
         * Indicate if the value is increasable.
         * @returns {boolean} Return `true` if it is decreasable, else `false`.
         */
        increasable () {
            const num = this.currentValue

            return isNaN(num) || num < this.max
        },

        /**
* Indicate if the value is decreasable.
* @returns {boolean} Return `true` if it is decreasable, else `false`.
*/
        decreasable () {
            const num = this.currentValue

            return isNaN(num) || num > this.min
        },

        /**
* Filter listeners
* @returns {Object} Return filtered listeners.
*/
        listeners () {
            const listeners = { ...this.$listeners }

            delete listeners.change

            return listeners
        }
    },

    watch: {
        value: {
            immediate: true,
            handler (newValue, oldValue) {
                if (
                // Avoid triggering change event when created
                    !(isNaN(newValue) && typeof oldValue === 'undefined') &&

          // Avoid infinite loop
          newValue !== this.currentValue
                ) {
                    this.setValue(newValue)
                }
            }
        }
    },

    methods: {
    /**
         * Change event handler.
         * @param {string} value - The new value.
         */
        change (event) {
            this.setValue(Math.min(this.max, Math.max(this.min, event.target.value)))
        },

        /**
* Paste event handler.
* @param {Event} event - Event object.
*/
        paste (event) {
            const clipboardData = event.clipboardData || window.clipboardData

            if (clipboardData && !REGEXP_NUMBER.test(clipboardData.getData('text'))) {
                event.preventDefault()
            }
        },

        /**
* Decrease the value.
*/
        decrease () {
            if (this.decreasable) {
                let { currentValue } = this

                if (isNaN(currentValue)) {
                    currentValue = 0
                }

                this.setValue(Math.min(this.max, Math.max(
                    this.min,
                    normalizeDecimalNumber(currentValue - this.step)
                )))
            }
        },

        /**
* Increase the value.
*/
        increase () {
            if (this.increasable) {
                let { currentValue } = this

                if (isNaN(currentValue)) {
                    currentValue = 0
                }

                this.setValue(Math.min(this.max, Math.max(
                    this.min,
                    normalizeDecimalNumber(currentValue + this.step)
                )))
            }
        },

        /**
* Set new value and dispatch change event.
* @param {number} value - The new value to set.
*/
        setValue (value) {
            const oldValue = this.currentValue
            let newValue = this.rounded ? Math.round(value) : value

            if (this.min <= this.max) {
                newValue = Math.min(this.max, Math.max(this.min, newValue))
            }

            this.currentValue = newValue

            if (newValue === oldValue) {
                // Force to override the number in the input box (#13).
                this.$refs.input.value = newValue
            }

            this.$emit('change', newValue, oldValue)
        }
    }
}
</script>

<style lang="scss" scoped>
.number-input {
  display: block;
  font-size: 0;
  max-width: 100%;
  // height: 40px;
  // overflow: hidden;
  position: relative;

  &__button {
    background-color: #fff;
    border: 0;
    border-radius: 0.25rem;
    bottom: 2px;
    position: absolute;
    top: 2px;
    width: 2.5rem;
    height: 50px;
    z-index: 1;

    &:focus {
      outline: none;
    }

    &:hover {
      &::before,
      &::after {
        background-color: #0074d9;
      }
    }

    &:disabled {
      opacity: 0.65;

      &::before,
      &::after {
        background-color: #ddd;
      }
    }

    &::before,
    &::after {
      background-color: #111;
      content: "";
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: background-color 0.15s;
    }

    &::before {
      height: 2px;
      width: 50%;
    }

    &::after {
      height: 50%;
      width: 2px;
    }

    &--minus {
      border-bottom-right-radius: 0;
      border-right: 2px solid #ddd;
      border-top-right-radius: 0;
      left: 2px;

      &::after {
        visibility: hidden;
      }
    }

    &--plus {
      border-bottom-left-radius: 0;
      border-left: 2px solid #ddd;
      border-top-left-radius: 0;
      right: 2px;
    }
  }

  &__input {
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 0.25rem;
    display: block;
    font-size: 1rem;
    max-width: 100%;
    padding: 0.4375rem 0.875rem;
    transition: border-color 0.15s;
    width: 100%;
    height: 40px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &:focus {
      border-color: #0074d9;
      outline: none;
    }

    &:disabled,
    &[readonly] {
      background-color: #f8f8f8;
    }
  }

  &--inline {
    display: inline-block;

    & > input {
      display: inline-block;
      width: 12.5rem;
    }
  }

  &--center {
    & > input {
      text-align: center;
    }
  }

  &--controls {
    & > input {
      padding-left: 3.375rem;
      padding-right: 3.375rem;
    }
  }

  &--small {
    & > input {
      border-radius: 10px;
      font-size: 28px;
      padding: 5px 40px;
    }

    &.number-input--inline > input {
      width: 80px;
    }

    &.number-input--controls > button {
      width: 40px;
    }

    &.number-input--controls > input {
      padding-left: 50px;
      padding-right: 50px;
    }
  }
}
</style>
