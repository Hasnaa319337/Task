<template>
  <div class="table_container">
    <!-- Start:: First Table -->
    <table class="table">
      <thead style="background: #ba68c8b5">
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
          style="background: rgb(187 187 187 / 56%)"
          v-for="item in items"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>
            <input v-model="item.barcode" />
            <span v-if="item.barcode != 1000">اضافه باركود جديد </span>
          </td>
          <td><input type="text" /></td>
          <td><input type="nubmer" v-model="item.qty" /></td>
          <td><input v-model="item.product_cost" /></td>
          <td><input type="number" v-model="item.discount_percentage" /></td>
          <td>
            {{ fixed_discount(item.product_cost, item.discount_percentage) }}
          </td>
          <td>
            {{
              calc_cost_after_discount(
                item.product_cost,
                fixed_discount(item.product_cost, item.discount_percentage)
              )
            }}
          </td>
          <td>{{ added_tax(item.barcode) }}</td>
          <td>
            {{
              cost_after_added_tax(
                calc_cost_after_discount(
                  item.product_cost,
                  fixed_discount(item.product_cost, item.discount_percentage)
                ),
                added_tax(item.barcode)
              )
            }}
          </td>
          <td>
            {{
              total(
                item.qty,
                cost_after_added_tax(
                  calc_cost_after_discount(
                    item.product_cost,
                    fixed_discount(item.product_cost, item.discount_percentage)
                  ),
                  added_tax(item.barcode)
                )
              )
            }}
            ريال
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End:: First Table -->

    <!-- Start :: Second Table -->
    <table>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.id"
          style="background: rgb(187 187 187 / 56%)"
        >
          <td v-if="item.barcode === '1000'">
            اجمالي القيمه الخاضعه للضريبه (10%)
          </td>
          <td v-if="item.barcode === '1200'">
            اجمالي القيمه الخاضعه للضريبه (15%)
          </td>
          <td v-if="item.barcode">
            {{
              total_after(
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
        <tr style="background: rgb(187 187 187 / 56%); font-weight: 900">
          <td>trans total before discount</td>
          <td>{{ trans_total_before_discount }} ريال</td>
        </tr>
        <tr style="background: rgb(187 187 187 / 56%); font-weight: 900">
          <td>اجمالي القيمه</td>
          <td>{{ total_below }} ريال</td>
        </tr>
        <tr
          style="
            background: rgb(187 187 187 / 56%);
            color: #df0d0d;
            font-weight: 900;
          "
        >
          <td>اجمالي الخصم</td>
          <td>{{ trans_total_before_discount - total_below }} ريال</td>
        </tr>
        <div class="line" />
        <tr
          v-for="item in items"
          :key="item.id"
          style="background: rgb(187 187 187 / 56%)"
        >
          <td v-if="item.barcode === '1000'">ضريبه القيمه المضافه (10%)</td>
          <td v-if="item.barcode === '1200'">ضريبه القيمه المضافه (15%)</td>
          <td v-if="item.barcode">
            {{
              after(
                total(
                  item.qty,
                  cost_after_added_tax(
                    calc_cost_after_discount(
                      item.product_cost,
                      fixed_discount(
                        item.product_cost,
                        item.discount_percentage
                      )
                    ),
                    added_tax(item.barcode)
                  )
                ),
                total_after(
                  item.barcode,
                  item.qty,
                  calc_cost_after_discount(
                    item.product_cost,
                    fixed_discount(item.product_cost, item.discount_percentage)
                  )
                )
              )
            }}
            ريال
          </td>
        </tr>
        <tr style="background: rgb(187 187 187 / 56%)">
          <td>يضاف ضريبه القيمه المضافه</td>
          <td>{{ total_discount }} ريال</td>
        </tr>
        <tr
          style="
            background: rgb(187 187 187 / 56%);

            font-weight: 900;
          "
        >
          <td>اجمالي الفاتوره</td>
          <td>{{ total_discount + total_below }} ريال</td>
        </tr>
      </tbody>
    </table>

    <!-- End :: Second Table -->
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  data() {
    return {
      columns: [
        "الرقم التعريفي",
        "باركود",
        "صنف",
        "الكميه",
        "تكلفه المنتج",
        "نسبه الخصم (%)",
        "الخصم الثابت",
        "التكلفة بعد الخصم",
        "الضريبه المضافه",
        "التكلفه بعد الضريبه",
        "اجمالي القيمه",
      ],
      items: [
        {
          id: "1",
          barcode: "1000",
          qty: 0,
          product_cost: 0,
          discount_percentage: 0,
        },
        {
          id: "2",
          barcode: "1200",
          qty: 0,
          product_cost: 0,
          discount_percentage: 0,
        },
      ],
    };
  },
  computed: {
    trans_total_before_discount() {
      var trans_total = 0;
      this.items.map((el) => {
        trans_total += el["qty"] * el["product_cost"];
      });
      return trans_total;
    },
    total_below() {
      var total = 0;
      this.items.map((el) => {
        total +=
          el["qty"] *
          this.calc_cost_after_discount(
            el["product_cost"],
            this.fixed_discount(el["product_cost"], el["discount_percentage"])
          );
      });
      return total;
    },
    total_discount() {
      let discount = 0;
      this.items.map((el) => {
        discount += this.after(
          this.total(
            el["qty"],
            this.cost_after_added_tax(
              this.calc_cost_after_discount(
                el["product_cost"],
                this.fixed_discount(
                  el["product_cost"],
                  el["discount_percentage"]
                )
              ),
              this.added_tax(el["barcode"])
            )
          ),
          this.total_after(
            el["barcode"],
            el["qty"],
            this.calc_cost_after_discount(
              el["product_cost"],
              this.fixed_discount(el["product_cost"], el["discount_percentage"])
            )
          )
        );
      });
      return discount;
    },
  },

  methods: {
    // Start:: adding values
    fixed_discount(x, y) {
      var fixed = x * (y / 100);
      return fixed;
    },
    calc_cost_after_discount(x, y) {
      return x - y;
    },
    added_tax(x) {
      if (x === "1000") {
        return "10";
      }
      if (x === "1200") {
        return "15";
      }
    },
    cost_after_added_tax(x, y) {
      return x + (x * y) / 100;
    },
    total(x, y) {
      return x * y;
    },
    // End:: adding values

    // Start:: calc Total

    total_after(x, y, z) {
      if (x === "1000") return y * z;
      if (x === "1200") return y * z;
    },

    total_value(x) {
      return x;
    },
    after(x, y) {
      return x - y;
    },
    // End:: calc Total
  },
  components: {},
};
</script>

<style lang="scss">
.table_container {
  direction: rtl;
  margin: 50px;
  h3 {
    margin: 30px 0;
  }
  table {
    text-align: center;
    margin: 30px 0;

    th,
    td {
      padding: 10px !important;
      font-family: "Cairo-Medium" !important;
      font-size: 16px;
    }
    input {
      text-align: center;
      border: 0;
      background: none;
      font-size: 16px;
      width: 50%;
      &:focus {
        border: 0;
        background: none;
        outline: 0;
      }
    }
  }
  .line {
    width: 600%;
    height: 2px;
    background: #ccc;
    margin: 4px 0;
  }
}
</style>
