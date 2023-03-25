<template>
 <table>
    <tr v-for="item in items" :key="item.id">
    <td>اجمالي القيمه الخاضعه للضريبه (10%)</td>
    <td v-if="item">
      {{
        total_after_10(
          item.barcode,
          item.qty,
          calc_cost_after_discount(
            item.product_cost,
            fixed_discount(item.product_cost, item.discount_percentage)
          )
        )
      }}
      ريال
    </td>
  </tr>
  <tr v-if="item.barcode === '1200'">
    <td>اجمالي القيمه الخاضعه للضريبه (15%)</td>
    <td>
      {{
        total_after_12(
          item.barcode,
          item.qty,
          calc_cost_after_discount(
            item.product_cost,
            fixed_discount(item.product_cost, item.discount_percentage)
          )
        )
      }}
      ريال
    </td>
  </tr>
 </table>

  <template>
    <td>اجمالي القيمه</td>
  </template>
  <template v-if="item.barcode === '1200' || '1000'">
    <td>trans total before discount</td>
    <td>{{ trans_total_before_discount(item.qty, item.product_cost) }} ريال</td>
  </template>
</template>

<script>
export default {
  props: ["items"],
  methods: {
    // Start:: calc Total

    total_after_10(x, y, z) {
      if (x === "1000") return y * z;
    },
    total_after_12(x, y, z) {
      if (x === "1200") return y * z;
    },
    trans_total_before_discount(x, y) {
      return x * y;
    },
    total_value(x, y) {
      return x + y;
    },

    // End:: calc Total
  },
};
</script>

<style></style>
