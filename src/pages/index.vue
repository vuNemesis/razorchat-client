<script setup lang="ts">
import { useSubscription } from '@urql/vue'
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const name = ref(user.savedName)

const enabled = ref(false)
const plan = ref('startup')

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()

const handleSubscription = (users = [], response) => {
  return [response.userAdded, ...users];
};

const result = useSubscription({
  query: `
        subscription userAdded {
          userAdded {
            id
            name
          }
        }
      `
}, handleSubscription)
</script>

<template>
  <div>
    <Menu v-slot="{open}" as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-30 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Options
          <carbon-chevron-up
            v-if="open"
            class="ml-2 -mr-1 h-5 w-5 text-white hover:text-violet-100"
            aria-hidden="true"
          />
          <carbon-chevron-down
            v-else
            class="ml-2 -mr-1 h-5 w-5 text-white hover:text-violet-100"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <carbon-edit
                  :class="['mr-2 h-5 w-5', active ? 'text-white' : 'text-violet-400']"
                  aria-hidden="true"
                  :horizontal-flip="false"
                />
                Edit
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <carbon-copy
                  :class="['mr-2 h-5 w-5', active ? 'text-white' : 'text-violet-400']"
                  aria-hidden="true"
                />
                Duplicate
              </button>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <carbon-archive
                  :class="['mr-2 h-5 w-5', active ? 'text-white' : 'text-violet-400']"
                  aria-hidden="true"
                />
                Archive
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <carbon-move
                  :class="['mr-2 h-5 w-5', active ? 'text-white' : 'text-violet-400']"
                  aria-hidden="true"
                />
                Move
              </button>
            </MenuItem>
          </div>

          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <carbon-delete
                  :class="['mr-2 h-5 w-5', active ? 'text-white' : 'text-violet-400']"
                  aria-hidden="true"
                />
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <p class="text-4xl">
      <carbon-scooter class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/ctholho/vitespa" target="_blank">
        Vitespa
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      class="px-4 py-2 w-32 text-center rounded bg-transparent border-gray-200 dark:border-gray-700 outline-none active:outline-none"
      @keydown.enter="go"
    >
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
