<template>
  <div class="table_container">
    <!-- Start:: Values Table -->
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
            <button
              class="add_btn"
              style="display: block"
              label="Show"
              @click="visible = true"
              v-if="!item.barcode"
            >
              اضافه باركود جديد
            </button>
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
        <tr v-if="items.id" style="background: rgb(187 187 187 / 56%)">
          <td>{{ items.id }}</td>
          <td>
            {{ items.barcode }}
            <button
              class="add_btn"
              style="display: block"
              label="Show"
              @click="visible = true"
              v-if="items.barcode != 1000"
            >
              اضافه باركود جديد
            </button>
          </td>
          <td><input type="text" /></td>
          <td><input type="nubmer" v-model="items.qty" /></td>
          <td>{{ items.product_cost }}</td>
          <td>{{ items.discount_percentage }}</td>
          <td>
            {{ fixed_discount(items.product_cost, items.discount_percentage) }}
          </td>
          <td>
            {{
              calc_cost_after_discount(
                items.product_cost,
                fixed_discount(items.product_cost, items.discount_percentage)
              )
            }}
          </td>
          <td>{{ added_tax(items.barcode) }}</td>
          <td>
            {{
              cost_after_added_tax(
                calc_cost_after_discount(
                  items.product_cost,
                  fixed_discount(items.product_cost, items.discount_percentage)
                ),
                added_tax(items.barcode)
              )
            }}
          </td>
          <td>
            {{
              total(
                items.qty,
                cost_after_added_tax(
                  calc_cost_after_discount(
                    items.product_cost,
                    fixed_discount(
                      items.product_cost,
                      items.discount_percentage
                    )
                  ),
                  added_tax(items.barcode)
                )
              )
            }}
            ريال
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End:: Values Table -->

    <!-- Start :: Total Table -->
    <table>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.id"
          style="background: rgb(187 187 187 / 56%)"
        >
          <td d v-if="item.barcode === '1000'">
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
        <tr style="background: rgb(187 187 187 / 56%); font-weight: 900">
          <td>اجمالي الفاتوره</td>
          <td>{{ total_discount + total_below }} ريال</td>
        </tr>
      </tbody>
    </table>
    <!-- End :: Total Table -->

    <!-- Start:: Popup -->
    <div class="card flex justify-content-center">
      <Dialog v-model:visible="visible" modal :style="{ width: '50vw' }">
        <form class="adding_barcode">
          <input
            type="number"
            v-model="items.id"
            placeholder="الرقم التعريفي"
          />
          <input type="text" v-model="items.barcode" placeholder="باركود" />
          <!-- 
          <input type="text" placeholder="صنف" />
          <input type="nubmer" v-model="items.qty" placeholder="الكميه" /> -->
          <input v-model="items.product_cost" placeholder="تكلفه المنتج" />
          <input
            type="number"
            v-model="items.discount_percentage"
            placeholder="نسبه الخصم %"
          />
        </form>

        <template #footer>
          <Button class="add_btn" @click="visible = false" text>الغاء</Button>
          <Button class="add_btn" @click="addNewBarcode()" autofocus
            >اضافه</Button
          >
        </template>
      </Dialog>
    </div>
    <!-- End:: Popup -->
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  data() {
    return {
      visible: false,
      columns: [
        "الرقم التعريفي",
        "باركود",
        "صنف",
        "الكميه",
        "تكلفه المنتج",
        "نسبه الخصم (%)",
        "الخصم الثابت",
        "التكلفة بعد الخصم",
        "الضريبه المضافه (%)",
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
        if (el["barcode"]) {
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
                this.fixed_discount(
                  el["product_cost"],
                  el["discount_percentage"]
                )
              )
            )
          );
        }
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
      if (x === "2000") {
        return "20";
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

    // Start::Add new barcode
    addNewBarcode() {
      // let item = this.items.find((item) => item.id == this.items.id);

      // this.items.push(item);
      this.visible = false;
      console.log("add");
      console.log(this.items);
    },
    // End:: Add new barcode
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
.add_btn {
  border: none;
  padding: 7px;
  background: #ce94d8;
  font-size: 14px;
  // display: block;
  margin: 7px auto;
  cursor: pointer;
  border: 1px solid #ce94d8;
  font-size: 15px;

  transition: 0.3s all ease-in-out;

  &:hover {
    color: #ce94d8;
    border: 1px solid #ce94d8;
    background: white;
    transition: 0.3s all ease-in-out;
  }
}
.adding_barcode {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  gap: 10px;
  text-align: center;

  input {
    padding: 10px;
    text-align: center;
    font-size: 17px;
    border: #ce94d8 2px solid;
    &:focus {
      border: #ce94d8 2px solid;
      outline: 0;
    }
  }
}
</style>
