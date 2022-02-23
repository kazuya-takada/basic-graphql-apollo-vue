<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

const { result, loading, error } = useQuery(GET_USERS)

</script>

<template>
  <h1>GraphQL</h1>
  <p v-if="loading">ローディング中です</p>
  <p v-else-if="error">エラーが発生しています</p>
  <template v-else>
    <p v-for="user in result.users" :key="user.id">
      Name: {{ user.name }}
    </p>
  </template>
</template>

<style>

</style>
