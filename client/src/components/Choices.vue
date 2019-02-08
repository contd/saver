<template>
  <div>
    <input type="text"
      :data-index="linkId"
      :value="tags"
      @addItem="addTag"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Choices from 'choices.js'

export default {
  name: 'Choices',
  props: {
    linkId: String
  },
  data() {
    return {
      tags: [],
      items: [],
      chosen: [],
      tagChoices: {}
    }
  },
  methods: {
    addTag() {
      //sendTags = this.tags.split(',')
      console.log(`Tags Changed: ${this.tags}`)
    }
  },
  mounted() {
    axios.get(`http://localhost:3333/api/${this.linkId}`)
      .then(resp => {
        console.log(resp)
        this.tags = resp.data.tags
        return
      })
      .then(() => {
        this.items = this.tags.map((i, tag) => {
          return {
            value: tag,
            label: tag,
            id: i
          }
        })

        this.chosen = this.items.map((i, tag) => {
          return {
            value: tag,
            label: tag,
            selected: false,
            disabled: false,
            id: i
          }
        })

        this.tagChoices = new Choices(tagsElem, {
          items: [this.items],
          choices: [this.chosen],
          addItems: true,
          removeItems: true,
          removeItemButton: true,
          editItems: true,
          duplicateItemsAllowed: false,
          delimiter: ',',
          searchEnabled: true,
          searchChoices: true,
          classNames: {
            containerOuter: 'choice',
            containerInner: 'choice__inner',
            input: 'choice__input',
            inputCloned: 'choice__input--cloned',
            list: 'choice__list',
            listItems: 'choice__list--multiple',
            listSingle: 'choice__list--single',
            listDropdown: 'choice__list--dropdown',
            item: 'choice__item',
            itemSelectable: 'choice__item--selectable',
            itemDisabled: 'choice__item--disabled',
            itemChoice: 'choice__item--choice',
            placeholder: 'choice__placeholder',
            group: 'choice__group',
            groupHeading: 'choice__heading',
            button: 'choice__button',
            activeState: 'is-active',
            focusState: 'is-focused',
            openState: 'is-open',
            disabledState: 'is-disabled',
            highlightedState: 'is-highlighted',
            hiddenState: 'is-hidden',
            flippedState: 'is-flipped',
            loadingState: 'is-loading',
            noResults: 'has-no-results',
            noChoices: 'has-no-choices'
          }
        })
      })
      .catch(err => {
        console.log(`Error getting link tags: ${err}`)
      })
  }
}
</script>