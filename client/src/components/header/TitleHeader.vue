<template>
  <div class="uk-width-1-3 uk-margin-remove uk-padding-remove">
    <div class="uk-grid uk-grid-small uk-padding-remove uk-margin-remove" uk-grid>
        <slot name="title"></slot>
      </div>
      <div class="uk-grid uk-grid-small uk-padding-remove uk-margin-remove" uk-grid>
        <slot name="nav"></slot>
    </div>
  </div>
</template>