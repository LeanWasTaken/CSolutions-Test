
<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height">
      <v-row>
        <v-col cols="12">
          <v-data-table
            style="border-radius: 10px;"
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="documents"
            class="elevation-1 border text-left"
          >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>CSolutions</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                class="mb-2"
                @click="newDocumentDialog()"
              >
                New Document Form
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              size="small"
              class="me-2"
              variant="text"
              color="#5865f2"
              @click="editItem(item)"
            >
              Document preview
            </v-btn>
          </template>
          <template v-slot:item.created_at="{ item }">
            {{ formatDate(item.created_at) }}
          </template>
        </v-data-table>
        <v-dialog
          v-model="newDocument"
          max-width="450px"
          >
          <v-card>
            <v-card-title class="text-center">
              <h2 class="py-2">New document</h2>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-container v-for="(field, index) in fields" :key="index">
                  <v-row>
                    <v-text-field v-model="field.weight" label="Field sequence (weight)"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-select :items="documentOptions" v-model="field.type" label="Field type"></v-select>
                  </v-row>
                  <v-row>
                    <v-text-field v-model="field.name" label="Field name"></v-text-field>
                  </v-row>
                  <v-switch v-model="field.mandatory" label="Mandatory" color="indigo"></v-switch>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="addField()" outlined>Add more</v-btn>
              <v-spacer />
              <v-btn @click="cancel()" outlined color="error">Cancel</v-btn>
              <v-btn outlined color="primary">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
          
          <!--<v-table class="border" style="border-radius: 10px;">
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Document Title</th>
                <th class="text-left">Created Date</th>
                <th class="text-left">Document Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in documents" :key="item.id">
                <td class="text-left">{{ item.id }}</td>
                <td class="text-left">{{ item.document_name }}</td>
                <td class="text-left">{{ item.created_at }}</td>
                <td class="text-left">{{ item.document_size }}</td>
                <td class="text-left">Preview document</td>
              </tr>
            </tbody>
          </v-table>-->
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      itemsPerPage: 15,
      newDocument: false,
      fields: [{ weight: '', type: '', name: '', mandatory: false }],

      documentOptions: [
        'Input',
        'Select',
        'NumberInput'
      ],
       
      headers: [
        {
          title: 'ID',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        { title: 'Document Title', key: 'document_name' },
        { title: 'Created Date',  key: 'created_at' },
        { title: 'Document Size',  key: 'document_size' },
        { title: '', align: 'end', key: 'actions' },
      ],
      documents: []
    }
  },

  methods: {
    newDocumentDialog() {
      this.newDocument = true;
    },
    formatDate(dateString) {
      const newDate = new Date(dateString)
      return newDate.toLocaleString()
    },
    addField() {
      this.fields.push({ weight: '', type: '', name: '', mandatory: false });
    },
    cancel() {
      this.newDocument = false;
      this.fields = [{ weight: '', type: '', name: '', mandatory: false }];
    },
    save() {
      // Needs saving via axios
      this.newDocument = false;
    }
  },

  async created() {
    let documents = await axios.get('http://localhost:3000/api/v1/documents')
    this.documents = documents.data;

    console.log(documents.data)
  }

}
</script>
